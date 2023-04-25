using System.Data.SqlClient;

namespace Smd.Dba.Boost.OnboardingPortal.Migration;

public interface ISqlMigration
{
    Task MigrateAsync(CancellationToken token);
    Task<List<string>> GetUniqueTableNamesFromScripts();
}