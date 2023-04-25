using Microsoft.Extensions.DependencyInjection;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;
using Smd.Dba.Boost.OnboardingPortal.Migration;

namespace Smd.Dba.Boost.OnboardingPortal.Tests.Integration;

[TestFixture]
public class InitializeDatabaseTest : BaseTest
{
    private IDatabaseInitializer _databaseInitializer;
    private IMsSql _msSql;

    
    

    [OneTimeSetUp]
    public async Task Setup()
    {
        
        _databaseInitializer =  _serviceProvider.GetService<IDatabaseInitializer>();
        _msSql = _serviceProvider.GetServices<IMsSql>().SingleOrDefault(msSql => msSql.GetConnectionStringKey() == "master");
        
        
        const string sqlDrop = "IF EXISTS (SELECT * FROM sys.databases WHERE name = 'test_db') DROP DATABASE test_db;";
        await _msSql.ExecuteAsync(sqlDrop, CancellationToken.None); 
    }
    
    
    [Test]
    public async Task InitializeDatabaseIfNotExistsAsync_WithoutExistingDb_DbInitialization()
    {
        await _databaseInitializer.InitializeDatabaseIfNotExistsAsync(CancellationToken.None);
        
        const string sqlSelect = "SELECT db_id('test_db')";
        var id = await _msSql.QueryAsync<int?>(sqlSelect, CancellationToken.None);
        Assert.GreaterOrEqual(id.FirstOrDefault(), 0);
        Assert.IsNotNull(id);
    }
    
    [Test]
    public async Task InitializeDatabaseIfNotExistsAsync_WithExistingDb_DoesNotThrowException()
    {
        const string sqlCreateDb = "CREATE DATABASE test_db;";
        await _msSql.ExecuteAsync(sqlCreateDb, CancellationToken.None);

        try
        {
            await _databaseInitializer.InitializeDatabaseIfNotExistsAsync(CancellationToken.None);
        }
        catch (Exception ex)
        {
            Assert.Fail($"Exception thrown: {ex}");
        }
    }
    
    
    
    
}