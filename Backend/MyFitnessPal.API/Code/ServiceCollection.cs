using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.BusinessLogic.Services;
using MyFitnessPal.Common.Configurations;

namespace MyFitnessPal.API.Code
{
    public static class ServiceCollection
    {
        public static IServiceCollection AddBusinessLogic(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSignInKeyConfiguration(configuration);
            services.AddRefreshTokenConfiguration(configuration);
            services.AddLoginTokenConfiguration(configuration);

            services.AddScoped<IHashingService, HashingService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserInfoService, UserInfoService>();
            services.AddScoped<IUserMessageService, UserMessageService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IAchievementService, AchievementService>();
            services.AddScoped<ISportService, SportService>();
            services.AddScoped<IStatisticsService, StatisticsService>();
            services.AddScoped<IWorkoutService, WorkoutService>();
            services.AddScoped<IChartService, ChartService>();

            return services;
        }

        private static IServiceCollection AddSignInKeyConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            var signinConfig = configuration.GetSection(SignInKeySetting.NAME).Get<SignInKeySetting>();
            services.AddSingleton(signinConfig);

            return services;
        }

        private static IServiceCollection AddLoginTokenConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            var logintokenConfig = configuration.GetSection(LoginTokenSetting.NAME).Get<LoginTokenSetting>();
            if (logintokenConfig.LoginTokenConfigs.TryGetValue(LoginTokenIdentifier.LoginToken, out var loginTokenConfig) == false)
            {
                throw new Exception();
            }
            services.AddSingleton(loginTokenConfig);

            return services;
        }

        private static IServiceCollection AddRefreshTokenConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            var reftokenConfig = configuration.GetSection(RefreshTokenSetting.NAME).Get<RefreshTokenSetting>();
            if (reftokenConfig.RefreshTokenConfigs.TryGetValue(RefreshTokenIdentifier.RefreshToken, out var refreshTokenConfig) == false)
            {
                throw new Exception();
            }
            services.AddSingleton(refreshTokenConfig);

            return services;
        }
    }
}
