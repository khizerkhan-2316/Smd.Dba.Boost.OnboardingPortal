using Microsoft.Extensions.DependencyInjection;

namespace Smd.Dba.Boost.OnboardingPortal.Client;

public static class ServiceCollectionExtensions
{
    public static void AddClients(this IServiceCollection services)
    {
        services.AddTransient<IEmailClient, GmailClient>();

    }
}