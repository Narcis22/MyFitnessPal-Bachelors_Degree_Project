using MediatR;
using Microsoft.AspNetCore.Http;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.Common.Exceptions;
using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Features
{
    public class RegisterCommand : IRequest<bool>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ProfilePhotoId { get; set; }
    }

    internal class RegisterCommandHandler : IRequestHandler<RegisterCommand, bool>
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        public RegisterCommandHandler(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }
        public async Task<bool> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            bool ok = false;
            var userProps = await _userService.GetUserSelectedProperties(request.Email, user => new { user.Id, user.Email });
            if (userProps != null)
            {
                string message = $"Email = {request.Email} already registered";
                throw new UserAlreadyRegisteredException(nameof(User), message);
            }
            else
            {
                await _userService.Register(request);
                ok = true;
            }
            return ok;
        }
    }
}
