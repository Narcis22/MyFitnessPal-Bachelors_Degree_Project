using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyFitnessPal.BusinessLogic.Features;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.Common.Configurations;
using MyFitnessPal.Common.Exceptions;
using MyFitnessPal.Common.Models;
using MyFitnessPal.DataAccess;
using MyFitnessPal.DataAccess.IRepositories;
using MyFitnessPal.Entities.Entities;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;

namespace MyFitnessPal.BusinessLogic.Services
{
    public class TokenService : ITokenService
    {
        private readonly RefreshTokenConfig _refreshTokenConfig;
        private readonly SignInKeySetting _signInKeySetting;
        private readonly ITokenRepository _tokenRepository;
   
        public TokenService(RefreshTokenConfig refreshTokenConfig,
                             SignInKeySetting signInKeySetting,
                             ITokenRepository tokenRepository
                             ) 
        {
            _refreshTokenConfig = refreshTokenConfig;
            _signInKeySetting = signInKeySetting;
            _tokenRepository = tokenRepository;
        }

        public async Task<Tuple<string, string>> GenerateTokenAndRefreshToken(SymmetricSecurityKey signinKey, User user, string roles, JwtSecurityTokenHandler tokenHandler, string newJti)
        {
            var token = GenerateJwtToken(signinKey, user, roles, tokenHandler, newJti);
            string tokenStringValue = tokenHandler.WriteToken(token);
            var refreshToken = GenerateRefreshToken();

            Token tokenInstance = new Token()
            {
                UserId = user.Id,
                TokenValue = tokenStringValue,
                RefreshToken = refreshToken,
                CreatedAt = token.ValidFrom,
                ExpireAt = token.ValidTo
            };

            await _tokenRepository.Create(tokenInstance);
            var tuple = new Tuple<string, string>(tokenStringValue, refreshToken);
            
            return tuple;
        }

        public SecurityToken GenerateJwtToken(SymmetricSecurityKey signinKey, User user, string roles, JwtSecurityTokenHandler tokenHandler, string newJti)
        {
            var subject = new ClaimsIdentity(new Claim[] {
                     new Claim(ClaimTypes.Email,user.Email),
                     new Claim(ClaimTypes.Name,user.FirstName),
                     new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                     new Claim(JwtRegisteredClaimNames.Jti,newJti),
                     new Claim("NumberOfAllowedRefreshes",_refreshTokenConfig.NumberOfRefreshes),
                     new Claim("IntervalOfUseOfRefreshTokenAfterTokenHasExpired",_refreshTokenConfig.TimeLeftUntilRefreshTokenExpiresAfterTokenAlreadyExpired),
                     new Claim(ClaimTypes.Role, roles)
             });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Issuer = _refreshTokenConfig.Issuer,
                Audience = _refreshTokenConfig.Audience,
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            return token;
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public Tuple<string, string, string, string, string> GetPrincipalFromExpiredToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token);
            var decodedToken = jsonToken as JwtSecurityToken;

            var jti = decodedToken.Claims.First(claim => claim.Type.Equals("jti")).ToString().Split(':')[1];
            var roles = decodedToken.Claims.First(claim => claim.Type.Equals("role")).ToString().Split(':')[1];  //?
            var allowedRefreshes = decodedToken.Claims.First(claim => claim.Type.Equals("NumberOfAllowedRefreshes")).ToString().Split(':')[1]; //
            var intervalOfUse = decodedToken.Claims.First(claim => claim.Type.Equals("IntervalOfUseOfRefreshTokenAfterTokenHasExpired")).ToString().Split(':')[1]; //
            var expirationDate = decodedToken.Claims.First(claim => claim.Type.Equals("exp")).ToString().Split(':')[1]; //

            var tuple = new Tuple<string, string, string, string, string>(allowedRefreshes, intervalOfUse, expirationDate, jti, roles);
           
            return tuple;
        }

        public async Task<Tuple<string, string>> ReGenerateTokens(ClaimsIdentity claims, Token usertoken)
        {
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_signInKeySetting.SecretSignInKeyForJwtToken));
            var refreshToken = GenerateRefreshToken();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Issuer = _refreshTokenConfig.Issuer,
                Audience = _refreshTokenConfig.Audience, 
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)

            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            string tokenStringValue = tokenHandler.WriteToken(token);
            usertoken.TokenValue = tokenStringValue;
            usertoken.RefreshToken = refreshToken;
            usertoken.CreatedAt = token.ValidFrom;
            usertoken.ExpireAt = token.ValidTo;

            var tuple = new Tuple<string, string>(tokenStringValue, refreshToken);
            
            return tuple;
        }

        public bool IsTokenValid(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true, // folosit sa valized audience si issuer setate in app.json
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_signInKeySetting.SecretSignInKeyForJwtToken)),
                ValidateLifetime = true,
                ValidIssuer = _refreshTokenConfig.Issuer,
                ValidAudience = _refreshTokenConfig.Audience
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken validatedToken;
            IPrincipal principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out validatedToken);
            
            return true;
        }

        public async Task<Token> GetUserTokenByRefreshToken(string refreshtoken)
        {
            ///where refreshtokentime is still valid/ where numberofrefreshes < maxallowedtokenrefresh?
            try
            {
                var userTokenObj = await _tokenRepository.GetAll()
                .Include(u => u.User)
                .Where(ut => ut.RefreshToken.Equals(refreshtoken))
                .FirstOrDefaultAsync();

                return userTokenObj;
            }
            catch (Exception ex)
            {
                return null;
            }
            
           
        }

        public async Task<TokenWrapper> Handle(RefreshTokenModel request)
        {
            var IdentityUserTokenObj = await GetUserTokenByRefreshToken(request.RefreshToken);
            var result = GetPrincipalFromExpiredToken(request.Token);

            var allowedRefreshes = Int32.Parse(result.Item1);
            var intervalOfUse = Int32.Parse(result.Item2);
            var expirationDate = Int32.Parse(result.Item3);
            DateTime tokenExpiration = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            tokenExpiration = tokenExpiration.AddSeconds(expirationDate).ToLocalTime();
            var jti = result.Item4;
            var roles = result.Item5.Split(',');

            if (IdentityUserTokenObj == null)
            {
                throw new WasNotAbleToRefreshTokenException("");
            }

            TokenWrapper tokenwrapper = new TokenWrapper();
            bool isTokenVerified = IsTokenValid(request.Token);
            if (isTokenVerified == true)
            {
                if (tokenExpiration < DateTime.UtcNow.AddHours(3))
                {
                    if (tokenExpiration.AddMinutes(intervalOfUse) >= DateTime.UtcNow)//addhours +2
                    {
                        if (allowedRefreshes != 0)
                        {
                            allowedRefreshes = allowedRefreshes - 1;
                            var claims = new ClaimsIdentity(new Claim[] {
                            new Claim(ClaimTypes.Email,IdentityUserTokenObj.User.Email),
                            new Claim(ClaimTypes.Name,IdentityUserTokenObj.User.FirstName),
                            new Claim(ClaimTypes.NameIdentifier,IdentityUserTokenObj.UserId.ToString()),
                            new Claim(JwtRegisteredClaimNames.Jti,jti),
                            new Claim("NumberOfAllowedRefreshes",allowedRefreshes.ToString()),
                            new Claim("IntervalOfUseOfRefreshTokenAfterTokenHasExpired",intervalOfUse.ToString())
                        });
                            foreach (var role in roles)
                            {
                                claims.AddClaim(new Claim(ClaimTypes.Role, role));
                            }
                            var tuple = await ReGenerateTokens(claims, IdentityUserTokenObj);
                            tokenwrapper.Token = tuple.Item1;
                            tokenwrapper.RefreshToken = tuple.Item2;

                            IdentityUserTokenObj.TokenValue = tokenwrapper.Token;
                            IdentityUserTokenObj.RefreshToken = tokenwrapper.RefreshToken;
                            IdentityUserTokenObj.CreatedAt = DateTime.UtcNow;
                            IdentityUserTokenObj.ExpireAt = DateTime.UtcNow.AddMinutes(1);

                            await _tokenRepository.Update(IdentityUserTokenObj);

                            return tokenwrapper;
                        }
                        else
                        {
                            throw new MaximumRefreshesExceededException("You can't refresh the current token anymore. Please login again");
                        }
                    }
                    else
                    {
                        throw new IntervalOfRefreshTokenExpiredException("Please login again!");
                    }
                }
            }
            return tokenwrapper;
        }

        public async Task<bool> DeleteToken(int userId)
        {
            var comment = await _tokenRepository.GetAll()
                                    .Where(cd => cd.UserId.Equals(userId))
                                    .SingleOrDefaultAsync();
            if (comment == null)
            {
                return false;
            }

            return await _tokenRepository.Delete(comment);
        }
    }
}
