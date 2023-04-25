using Microsoft.Extensions.DependencyInjection;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;
using Smd.Dba.Boost.OnboardingPortal.Migration;

namespace Smd.Dba.Boost.OnboardingPortal.Tests.Integration;

[TestFixture]
public class MigrationTest : BaseTest
{
    private ISqlMigration _sqlMigration;
    private IMsSql _msSql;
    
    
    
    [OneTimeSetUp]
    public void Setup()
    {
        _sqlMigration = _serviceProvider.GetService<ISqlMigration>();
        _msSql =  _serviceProvider.GetServices<IMsSql>().SingleOrDefault(msSql => msSql.GetConnectionStringKey() == "test");
    }

    [Test]
    public async Task MigrateAsync_ShouldMigrateDatabaseSuccessfully()
    {
        await _sqlMigration.MigrateAsync(CancellationToken.None);
        var tableNames = await _sqlMigration.GetUniqueTableNamesFromScripts();


        foreach (var tableName in tableNames)
        {
            var sql = $"SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '{tableName}'";

            var count = await _msSql.QueryAsync<int>(sql, CancellationToken.None);
            
            Assert.AreEqual(1, count.FirstOrDefault(), $"Table '{tableName}' was not created successfully.");
        }
        
    }

  
}