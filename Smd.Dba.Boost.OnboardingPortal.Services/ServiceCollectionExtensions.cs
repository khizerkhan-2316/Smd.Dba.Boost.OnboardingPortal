using Microsoft.Extensions.DependencyInjection;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;
using Smd.Dba.Boost.OnboardingPortal.Services.Profiles;

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
            .AddTransient<IEmailService, EmailService>()
            .AddTransient<IContactPersonService, ContactPersonService>()
            .AddTransient<IOnboardingService, OnboardingService>()
            .AddTransient<IProductFeedService, ProductFeedService>()
            .AddTransient<IRobotService, RobotService>();
    }

    public static void AddAutoMapper(this IServiceCollection services)
    {
        services.AddAutoMapper(
            typeof(UserMappingProfile), 
            typeof(CompanyMappingProfile), 
            typeof(ContactPersonMappingProfile), 
            typeof(ProductFeedMappingProfile));
    }
}