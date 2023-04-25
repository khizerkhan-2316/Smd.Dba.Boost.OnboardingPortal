using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;
using Smd.Dba.Boost.OnboardingPortal.Migration;

namespace Smd.Dba.Boost.OnboardingPortal.Tests.Integration;

public static class TestServiceCollectionExtensions
{
    public static IServiceProvider RegisterTestServices()
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();


        return new ServiceCollection()
            .AddSingleton<IMsSql, MsSql>(provider => new MsSql(configuration, "master"))
            .AddSingleton<IMsSql, MsSql>(provider => new MsSql(configuration, "test"))
            .AddSingleton<IDatabaseInitializer, DatabaseInitializer>(provider => new DatabaseInitializer(provider.GetServices<IMsSql>(), "master", "test_db"))
            .AddSingleton<ISqlMigration, SqlMigration>(provider => new SqlMigration(provider.GetServices<IMsSql>(), "test"))
            .BuildServiceProvider();
    }
}
