using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

namespace Smd.Dba.Boost.OnboardingPortal.Migration;

public static class ServiceCollectionExtensions
{
    public static IServiceProvider RegisterServices()
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();
        
        return new ServiceCollection()
            .AddSingleton<IMsSql, MsSql>(provider => new MsSql(configuration, "master"))
            .AddSingleton<IMsSql, MsSql>(provider => new MsSql(configuration, "imssql"))
            .AddSingleton<IDatabaseInitializer, DatabaseInitializer>(provider => new DatabaseInitializer(provider.GetServices<IMsSql>(), "master", "dba_onboardingportal"))
            .AddSingleton<ISqlMigration, SqlMigration>(provider => new SqlMigration(provider.GetServices<IMsSql>(), "imssql"))
            .BuildServiceProvider();
    }
}