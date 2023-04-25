namespace Smd.Dba.Boost.OnboardingPortal.Migration;

public interface IDatabaseInitializer
{
    Task InitializeDatabaseIfNotExistsAsync(CancellationToken token);
    Task TearDownDatabaseIfExists(CancellationToken token);
}