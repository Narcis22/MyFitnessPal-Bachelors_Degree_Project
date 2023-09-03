using Microsoft.IdentityModel.Tokens;
using MyFitnessPal.BusinessLogic.Features;
using MyFitnessPal.Common.Models;
using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Interfaces
{
    public interface ITokenService
    {
        Task<Tuple<string, string>> GenerateTokenAndRefreshToken(SymmetricSecurityKey signinKey, User user, string roles, JwtSecurityTokenHandler tokenHandler, string newJti);
        string GenerateRefreshToken();
        SecurityToken GenerateJwtToken(SymmetricSecurityKey signinKey, User user, string roles, JwtSecurityTokenHandler tokenHandler, string newJti);
        Tuple<string, string, string, string, string> GetPrincipalFromExpiredToken(string token);
        Task<Tuple<string, string>> ReGenerateTokens(ClaimsIdentity claims, Token usertoken);
        bool IsTokenValid(string token);
        Task<Token> GetUserTokenByRefreshToken(string refreshtoken);
        Task<TokenWrapper> Handle(RefreshTokenModel request);
        Task<bool> DeleteToken(int id);
    }
}

