using Microsoft.AspNetCore.Http;
using MyFitnessPal.BusinessLogic.Features;
using MyFitnessPal.Common.Models;
using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Interfaces
{
    public interface IUserService
    {
        Task<List<UserManagementModel>> GetAllUsers();
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserById(int id);
        Task<UserModel> GetUserModel(string email);
        Task<int> GetUserIdByEmail(string email);
        //Task<Token> GetUserTokenByRefreshToken(string refreshtoken);
        Task<T> GetUserSelectedProperties<T>(string uniqueIdentifier, Expression<Func<User, T>> selector, CancellationToken cancellationToken = default);
        Task<bool> Update(UserModel user);
        Task<bool> ChangePassword(UserChangePasswordModel user);
        Task<bool> SoftDeleteUser(string email);
        Task<bool> MakeUserAdmin(string email);
        Task<LoginResponseModel> Login(LoginModel loginModel);
        Task<bool> Register(RegisterCommand registerCommand);
        Task<bool> ForgetPassword(string email);
        Task<string> ForceChangePassword(User user);
        Task<bool> SendMail(MessageToCustomerServiceModel message);
        Task<byte[]> ConvertToBytes(IFormFile file);
        Task<bool> ChangeProfilePhoto(string email, string profilePhotoId, IFormFile userImage);
        Task<UserImageModel> GetUserImage(string email);
        Task<int> NoUsersAtTheTime(int month);
        Task<bool> DeleteToken(string email);
    }
}
