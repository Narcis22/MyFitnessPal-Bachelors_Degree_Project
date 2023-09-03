using Microsoft.AspNetCore.Mvc;
using MyFitnessPal.BusinessLogic.Features;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.Common.Exceptions;
using MyFitnessPal.Common.Models;

namespace MyFitnessPal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public UserController(
            IUserService userService,
            ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterCommand registerCommand)
        {
            try
            {
                await _userService.Register(registerCommand);
                return Ok();
            }
            catch (UserAlreadyRegisteredException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            try
            {
                var result = await _userService.Login(loginModel);
                return Ok(result);
            }
            catch (NotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (IncorrectPasswordException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ExceededMaximumAmountOfLoginAttemptsException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Update([FromBody] UserModel user)
        {
            var result = await _userService.Update(user);

            if (result == false)
            {
                return NotFound();
            }
           
            UserModel updatedUser = await _userService.GetUserModel(user.Email);
         
            return Ok(updatedUser);
        }

        [HttpPut]
        [Route("changePassword")]
        public async Task<IActionResult> changePassword([FromBody] UserChangePasswordModel user)
        {
            var result = await _userService.ChangePassword(user);

            if (result == false)
            {
                return BadRequest("Invalid credentials");
            }

            return Ok(result);
        }

        [HttpDelete]
        [Route("deleteTokenAsync/{email}")]
        public async Task<IActionResult> DeleteTokenAsync(string email)
        {
            if (!await _userService.DeleteToken(email))
            {
                return NotFound();
            }

            return Ok();
         }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshLoginToken([FromBody] RefreshTokenModel refreshToken)
        {
            try
            {
                var result = await _tokenService.Handle(refreshToken);
                return Ok(result);
            }
            catch (IntervalOfRefreshTokenExpiredException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (MaximumRefreshesExceededException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("softDelete/{email}")]
        public async Task<IActionResult> DeleteUserAccount(string email)
        {
            var result = await _userService.SoftDeleteUser(email);
            return Ok(result);
        }

        [HttpPut("makeAdmin/{email}")]
        public async Task<IActionResult> MakeUserAdmin(string email)
        {
            var result = await _userService.MakeUserAdmin(email);
            return Ok(result);
        }

        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _userService.GetAllUsers();
            return Ok(result);
        }

        [HttpGet("getUserModel/{email}")]
        public async Task<IActionResult> GetUserModel(string email)
        {
            var result = await _userService.GetUserModel(email);
            return Ok(result);
        }

        [HttpGet("getUserIdByEmail/{email}")]
        public async Task<IActionResult> GetUserIdByEmail(string email)
        {
            var result = await _userService.GetUserIdByEmail(email);
            return Ok(result);
        }

        [HttpPost("forgetPassword/{email}")]
        public async Task<IActionResult> ForgetPassword(string email)
        {
            var result = await _userService.ForgetPassword(email);
            return Ok(result);
        }

        [HttpPost("sendMail")]
        public async Task<IActionResult> sendMail([FromBody] MessageToCustomerServiceModel message)
        {
            var result = await _userService.SendMail(message);
            return Ok(result);
        }

        [HttpGet("getUserImage/{email}")]
        public async Task<IActionResult> GetUserImage(string email)
        {
            var result = await _userService.GetUserImage(email);
            return Ok(result);
        }

        [HttpPost("upload/{email}/{profilePhotoId}", Name = "UploadProductImage")]
        public async Task<IActionResult> UploadImage( [FromRoute] string email, [FromRoute] string profilePhotoId, IFormFile? file = null)
        {
            if (file != null && !IsValidFile(file))
            {
                return BadRequest(new { message = "Invalid file extensions" });
            }

            var result = await _userService.ChangeProfilePhoto(email, profilePhotoId, file);
            return Ok(result);
        }

        private bool IsValidFile(IFormFile file)
        {
            List<string> validFormats = new List<string>() { ".jpg", ".png", ".jpeg" };
            var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            return validFormats.Contains(extension);
        }
    }
}
