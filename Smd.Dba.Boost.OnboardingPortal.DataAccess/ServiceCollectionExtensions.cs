using System.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess;

public static class ServiceCollectionExtensions
{
    public static void AddMsSql(this IServiceCollection services, string connectionStringKey)
    {
        services.AddSingleton<IMsSql, MsSql>(provider =>
        {
            var configuration = provider.GetRequiredService<IConfiguration>();
            return new MsSql(configuration, connectionStringKey);
        });
    }
}

