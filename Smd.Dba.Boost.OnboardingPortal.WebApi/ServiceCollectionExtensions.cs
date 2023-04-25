namespace Smd.Dba.Boost.OnboardingPortal.WebApi;

public static class ServiceCollectionExtensions
{
    public static void AddAppsettingsConfiguration(this IServiceCollection services)
    {
        services.AddSingleton<IConfiguration>(new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build());

    }
}