using Microsoft.Extensions.DependencyInjection;
using Smd.Dba.Boost.OnboardingPortal.Migration;

namespace Smd.Dba.Boost.OnboardingPortal.Tests.Integration;

[TestFixture]
public class BaseTest
{
    protected readonly IServiceProvider _serviceProvider;
    private IDatabaseInitializer _databaseInitializer;
    
    public BaseTest()
    {
        _serviceProvider = TestServiceCollectionExtensions.RegisterTestServices();
        _databaseInitializer = _serviceProvider.GetService<IDatabaseInitializer>();
        
    }

    [OneTimeSetUp]
    public async Task  OneTimeSetUp()
    {
        await _databaseInitializer.InitializeDatabaseIfNotExistsAsync(CancellationToken.None);
    }

    [OneTimeTearDown]
    public async Task OneTimeTearDown()
    {
        await _databaseInitializer.TearDownDatabaseIfExists(CancellationToken.None);
        if (_serviceProvider is IDisposable disposable)
        {
            disposable.Dispose();
        }
    }

   
}