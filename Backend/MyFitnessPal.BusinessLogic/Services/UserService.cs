using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyFitnessPal.BusinessLogic.Features;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.Common.Configurations;
using MyFitnessPal.Common.Exceptions;
using MyFitnessPal.Common.Models;
using MyFitnessPal.Entities.Entities;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Text;
using System.Security.Cryptography;
using MyFitnessPal.Common.Constraints;
using Microsoft.AspNetCore.Http;
using MyFitnessPal.DataAccess.IRepositories;

namespace MyFitnessPal.BusinessLogic.Services
{
    public class UserService: IUserService
    {
        private readonly IHashingService _hashingAlgorithm;
        private readonly ITokenService _tokenService;
        private readonly SignInKeySetting _signInKeySetting;
        private readonly IEmailService _emailService;
        private readonly IUserInfoService _userInfoService;
        private readonly IUserMessageService _userMessageService;
        private readonly IRoleService _roleService;
        private readonly IUserRepository _userRepository;

        private string _customerServiceEmail = "denissa.prede@gmail.com";
        private string _customerServiceAccessPassword = "vdukalomybgffccv";
        private string _host = "smtp.gmail.com";

        public UserService(
            IHashingService hashingAlgorithm,  
            ITokenService tokenService, 
            SignInKeySetting signInKeySetting,
            IEmailService emailService,
            IUserInfoService userInfoService,
            IUserMessageService userMessageService,
            IUserRepository userRepository,
            IRoleService roleService
            ) {
            _hashingAlgorithm = hashingAlgorithm;
            _tokenService = tokenService;
            _signInKeySetting = signInKeySetting;
            _emailService = emailService;
            _userInfoService = userInfoService;
            _userMessageService = userMessageService;
            _userRepository = userRepository;
            _roleService = roleService;
        }

        public async Task<List<UserManagementModel>> GetAllUsers()
        {
            return await _userRepository.GetAll()
                         .Include(info => info.UserInfo)
                         .Where(user => user.IsDeleted.Equals(false) && !user.Role.Name.Equals(RoleType.Admin))
                         .Select(user => new UserManagementModel
                         {
                            Email = user.Email,
                            Username = user.Username,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            DateJoin = user.CreatedAt,
                            ProfilePicId = user.UserInfo.ProfilePhotoId,
                            Image = user.UserInfo.ImageByteArray == null ? "" : Convert.ToBase64String(user.UserInfo.ImageByteArray),
                            ImageContentType = user.UserInfo.ImageContentType
                         }).ToListAsync();
        }

        public async Task<User> GetUserById(int id)
        {
            return await _userRepository.GetAll().Where(user => user.Id == id).FirstOrDefaultAsync();
        }

        public async Task<UserModel> GetUserModel(string email)
        {
            return await _userRepository.GetAll()
                .Where(u => u.Email.Equals(email))
                .Select(u => new UserModel {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName= u.LastName,
                    Email = email,
                    Username = u.Username,
                    Sex = u.UserInfo.Sex,
                    Height = u.UserInfo.Height,
                    Weight = u.UserInfo.Weight,
                    Age = u.UserInfo.Age
            }).SingleOrDefaultAsync();
        }

        public async Task<int> GetUserIdByEmail(string email)
        {
            var user = await _userRepository.GetAll().Where(u => u.Email.Equals(email)).FirstOrDefaultAsync();
            return user.Id;
        }

        public async Task<T> GetUserSelectedProperties<T>(string email, Expression<Func<User, T>> selector, CancellationToken cancellationToken = default)
        {
            var selectedUserPropertiesObject = await _userRepository.GetAll()
                                                    .AsNoTracking()
                                                    .Where(u => u.IsDeleted.Equals(false) && u.Email.Equals(email))
                                                    .Select(selector)
                                                    .SingleOrDefaultAsync(cancellationToken);

            return selectedUserPropertiesObject;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _userRepository.GetAll()
                                        .Where(u => u.IsDeleted.Equals(false) && u.Email.Equals(email))
                                        .SingleOrDefaultAsync();
        }

        public async Task<bool> Update(UserModel userModel)
        {
            User user = await GetUserByEmail(userModel.Email);

            user.FirstName = userModel.FirstName;
            user.LastName = userModel.LastName;
            user.Username = userModel.Username;

            await _userRepository.Update(user);

            UserInfo userInfo = await _userInfoService.GetUserInfo(user.Id);

            userInfo.Sex = userModel.Sex;
            userInfo.Height = userModel.Height;
            userInfo.Weight = userModel.Weight;
            userInfo.Age = userModel.Age;

            return await _userInfoService.Update(userInfo);
        }

        public async Task<bool> ChangePassword(UserChangePasswordModel personalData)
        {
            User user = await GetUserByEmail(personalData.Email);

            string initialsalt = user.HashedPassword.Split('.')[1];
            bool isPasswordVerified = _hashingAlgorithm.IsPasswordVerified(user.HashedPassword, initialsalt, personalData.Password);

            if (isPasswordVerified)
            {
                string result = _hashingAlgorithm.CalculateHashValueWithInput(personalData.NewPassword);

                if (result != null)
                {
                    user.HashedPassword = result;
                    return await _userRepository.Update(user);
                }      
            }
            return false;
        }

        public async Task<bool> SoftDeleteUser(string email)
        {    
            var user = await _userRepository.GetAll().Where(m => m.Email.Equals(email)).SingleOrDefaultAsync();

            if (user == null)
                return false;
                
            user.IsDeleted = true;

            await _userRepository.Update(user);

            return user.IsDeleted;
        }

        public async Task<bool> MakeUserAdmin(string email)
        {
            var user = await _userRepository.GetAll().Where(m => m.Email.Equals(email)).SingleOrDefaultAsync();

            if (user == null)
                return false;

            user.RoleId = 1;

            var result = await _userRepository.Update(user);

            return result;
        }

        public async Task<LoginResponseModel> Login(LoginModel loginModel)
        {
            User user = await _userRepository
                                    .GetAllIncludeRole()
                                    .Where(u => u.Email.Equals(loginModel.Email) && u.IsDeleted == false)
                                    .FirstOrDefaultAsync();

            if (user == null)
            {
                string messageNotFound = $"Invalid credentials";
                throw new NotFoundException(nameof(User), messageNotFound);
            }

            var roles = user.Role.Name;
            string initialsalt = user.HashedPassword.Split('.')[1];
            bool isPasswordVerified = _hashingAlgorithm.IsPasswordVerified(user.HashedPassword, initialsalt, loginModel.Password);
                
            if (isPasswordVerified)
            {
                var newJti = Guid.NewGuid().ToString();
                var tokenHandler = new JwtSecurityTokenHandler();
                var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_signInKeySetting.SecretSignInKeyForJwtToken));
                var tokenresult = await _tokenService.GenerateTokenAndRefreshToken(signinKey, user, roles, tokenHandler, newJti);

                LoginResponseModel loginResponseModel = new LoginResponseModel();
                loginResponseModel.Token = tokenresult.Item1;
                loginResponseModel.RefreshToken = tokenresult.Item2;
                loginResponseModel.Username = user.Username;

                return loginResponseModel;
            }

            string message = $"Invalid credentials";
            throw new IncorrectPasswordException(message);
        }

        public async Task<bool> Register(RegisterCommand registerCommand)
        {
            User user = await _userRepository.GetAll().Where(u => u.Email.Equals(registerCommand.Email)).SingleOrDefaultAsync();

            if (user == null)
            {
                var registerUser = new User();
                registerUser.Email = registerCommand.Email;
                registerUser.FirstName = registerCommand.FirstName;
                registerUser.LastName = registerCommand.LastName;
                registerUser.CreatedAt = DateTime.UtcNow;
                registerUser.IsDeleted = false;
                registerUser.RoleId = await _roleService.GetRoleId(RoleType.User);
                registerUser.Username = registerCommand.FirstName + " " + registerCommand.LastName;

                string result = _hashingAlgorithm.CalculateHashValueWithInput(registerCommand.Password);
                if (result != null)
                {
                    registerUser.HashedPassword = result;

                    bool saved = await _userRepository.Create(registerUser);
                    if (saved)
                    {
                        int userId = await GetUserIdByEmail(registerCommand.Email);
                      
                        UserInfo userInfo = new UserInfo();
                        userInfo.UserId = userId;
                        userInfo.ImageByteArray = null;
                        userInfo.ImageContentType = null;
                        userInfo.ProfilePhotoId = registerCommand.ProfilePhotoId;
                        
                        return await _userInfoService.Create(userInfo);
                    }
                }
            }

            string message = "Email = " + registerCommand.Email + " already registered";
            throw new UserAlreadyRegisteredException(nameof(User), message);
        }

        public async Task<string> ForceChangePassword(User user)
        {
            Random rnd = new Random();
            int length = rnd.Next(8, 15);

            string password = GeneratePassword(length);
            string hashedPassword = _hashingAlgorithm.CalculateHashValueWithInput(password);

            user.HashedPassword = hashedPassword;
            await _userRepository.Update(user);

            return password;
        }

        public async Task<bool> ForgetPassword(string email)
        {
            User user = await GetUserByEmail(email);

            if (user == null)
            {
                string messageNotFound = $"User with email = {email} was not found or your account is deleted";
                throw new NotFoundException(nameof(User), messageNotFound);
            }

            string password = await ForceChangePassword(user);

            string subject = "Reset password for MyFitnessPal account";

            StringBuilder sb = new StringBuilder();
            sb.AppendLine(string.Format("<div>Hello {0} {1}</div>", user.FirstName, user.LastName));
            sb.AppendLine("<br/>");
            sb.AppendLine("<div>We're sorry to find you in trouble, so we've generated a new password for you.</div>");
            sb.AppendLine("<br/>");
            sb.AppendLine($"<div>The new password is: <b>{password}</b> </div>");
            sb.AppendLine("<br/>");
            sb.AppendLine($"<div> Please change this password in your account. Go to My Profile page and click on edit profile. On there you'll see a button for change password.</div>");
            sb.AppendLine("<br/>");
            sb.AppendLine($"<div> But before click <a href='http://localhost:4200/auth/login'>here</a> to login </div>");
            sb.AppendLine("<br/>");
            sb.AppendLine("<div>From your friends at MyFitnessPal</div>");
   
            return await _emailService.SendMailWithNewPassword(subject, sb.ToString(), user.Email);
        }

        private static string GeneratePassword(int PasswordLength = 0)
        {
            RNGCryptoServiceProvider provider = new RNGCryptoServiceProvider();
            string CapitalLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";
            string SmallLetters = "qwertyuiopasdfghjklzxcvbnm";
            string Digits = "0123456789";
            string SpecialCharacters = "!@#$%^&*()-_=+<,>.";
            string AllChar = CapitalLetters + SmallLetters + Digits + SpecialCharacters;

            StringBuilder password = new StringBuilder();
            for (int n = 0; n < PasswordLength; n++)
            {
                password = password.Append(GenerateChar(AllChar, provider));
            }

            return password.ToString();
        }

        private static char GenerateChar(string availableChars, RNGCryptoServiceProvider provider)
        {
            var byteArray = new byte[1];
            char c;
            do
            {
                provider.GetBytes(byteArray);
                c = (char)byteArray[0];

            } while (!availableChars.Any(x => x == c));

            return c;
        }


        public async Task<bool> SendMail(MessageToCustomerServiceModel message)
        {
            User user = await GetUserByEmail(message.Email);

            if (user == null)
            {
                string messageNotFound = $"Invalid credentials";
                throw new NotFoundException(nameof(User), messageNotFound);
            }

            StringBuilder sb = new StringBuilder();
            sb.AppendLine(string.Format("<div> User: {0} {1} with email: {2} </div>", user.FirstName, user.LastName, user.Email));
            sb.AppendLine("<br/>");
            sb.AppendLine("<div> Sent the message: </div>");
            sb.AppendLine("<br/>");
            sb.AppendLine($"<div>{message.Message}</div>"); 
            sb.AppendLine("<br/>");
            sb.AppendLine("<div> Using MyFitnessPal's built in email sending functionality </div>");

            string subject = string.Format("Message from an user of MyFitnessPal");

            bool send = await _emailService.SendMailToCustomerService(subject, sb.ToString());

            if (send)
            {
                return await _userMessageService.SaveMessageInfo(message.Message, user.Id);
            }
            return false;
        }

        public async Task<byte[]> ConvertToBytes(IFormFile file)
        {
            byte[] fileBytes = null;
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                fileBytes = stream.ToArray();
            }

            return fileBytes;
        }

        public async Task<bool> ChangeProfilePhoto(string email, string profilePhotoId, IFormFile? file = null)
        {
            var user = await GetUserByEmail(email);

            if (user == null)
            {
                string messageNotFound = $"Invalid credentials";
                throw new NotFoundException(nameof(User), messageNotFound);
            }

            string contentType = null;
            byte[] imageBytes = null!;

            if (file != null)
            {
                imageBytes = await ConvertToBytes(file);
                contentType = file.ContentType;
            }
            
            UserInfo userInfo = await _userInfoService.GetUserInfo(user.Id);
            userInfo.ImageByteArray = imageBytes;
            userInfo.ImageContentType = contentType;
            userInfo.ProfilePhotoId = profilePhotoId;
            return await _userInfoService.Update(userInfo);
        }

        public async Task<UserImageModel> GetUserImage(string email)
        {
            UserInfo userInfo = await _userInfoService.GetUserInfoByEmail(email);
                        

            UserImageModel userImage = new UserImageModel();
            userImage.ProfilePhotoId = userInfo.ProfilePhotoId;

            if (userInfo.ImageByteArray == null)
            {
                userImage.ImageBase64 = "";
                userImage.ImageContentType = "";
                return userImage;
            }

            userImage.ImageBase64 = Convert.ToBase64String(userInfo.ImageByteArray);
            userImage.ImageContentType = userInfo.ImageContentType;
            return userImage;
        }

        public async Task<int> NoUsersAtTheTime(int month)
        {
            return await _userRepository.GetAll()
                                  .Where(user => user.IsDeleted == false && user.CreatedAt.Month <= month)
                                  .CountAsync();
        }

        public async Task<bool> DeleteToken(string email)
        {
            int id = await GetUserIdByEmail(email);
            return await _tokenService.DeleteToken(id);
        }
    }
}
