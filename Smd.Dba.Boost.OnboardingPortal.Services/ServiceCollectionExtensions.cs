using Microsoft.Extensions.DependencyInjection;
using Smd.Dba.Boost.OnboardingPortal.Services.Profiles;
using Smd.Dba.Boost.OnboardingPortal.Services.Services;

namespace Smd.Dba.Boost.OnboardingPortal.Services;

public static class ServiceCollectionExtensions
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddTransient<IUserService, UserService>()
            .AddTransient<ICompanyService, CompanyService>()
            .AddTransient<IAuthenticationService, AuthenticationService>()
            .AddTransient<IHashingService, BcryptHashingService>()
            .AddTransient<ITokenService, JwtTokenService>()
            .AddTransient<IEmailService, EmailService>();
    }

    public static void AddAutoMapper(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(UserMappingProfile), typeof(CompanyMappingProfile));
    }
}