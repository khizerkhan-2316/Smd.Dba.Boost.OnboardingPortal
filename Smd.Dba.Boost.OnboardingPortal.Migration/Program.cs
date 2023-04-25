using Microsoft.Extensions.DependencyInjection;

namespace Smd.Dba.Boost.OnboardingPortal.Migration
{
    public class Program
    {
        static async Task Main(string[] args)
        {
            var serviceProvider = ServiceCollectionExtensions.RegisterServices();

            var databaseInitializer = serviceProvider.GetService<IDatabaseInitializer>();
            await databaseInitializer.InitializeDatabaseIfNotExistsAsync(CancellationToken.None);

            var sqlMigration = serviceProvider.GetService<ISqlMigration>();
            await sqlMigration.MigrateAsync(CancellationToken.None);
        }
    }
}