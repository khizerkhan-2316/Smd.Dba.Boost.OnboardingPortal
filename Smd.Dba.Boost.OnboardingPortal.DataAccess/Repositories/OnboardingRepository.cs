using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

public class OnboardingRepository : IOnboardingRepository
{
    private readonly IMsSql _msSql;

    public OnboardingRepository(IMsSql msSql)
    {
        _msSql = msSql;
    }
    
    public async Task<Onboarding?> GetById(Guid id, CancellationToken cancellationToken)
    {
        var query = "SELECT * FROM Onboardings WHERE Id = @Id";
        var parameters = new { Id = id };

        return await _msSql.QuerySingleOrDefaultAsync<Onboarding>(query, parameters, cancellationToken);

    }

    public async Task<IEnumerable<Onboarding>> GetOnboardings(CancellationToken cancellationToken)
    {
        var query = "SELECT * FROM Onboardings";
        
        return await _msSql.QueryAsync<Onboarding>(query, cancellationToken);

    }

public async Task AddOnboarding(Onboarding onboarding, CancellationToken cancellationToken)
{
    var query = "INSERT INTO Onboardings (Id, CompanyId, Step1Completed, Step2Completed, Step3Completed, Step4Completed, Step5Completed, Step6Completed, Step7Completed, OnboardingCompleted) " +
                "VALUES (@Id, @CompanyId, @Step1Completed, @Step2Completed, @Step3Completed, @Step4Completed, @Step5Completed, @Step6Completed, @Step7Completed, @OnboardingCompleted)";

    var parameters = new
    {
        onboarding.Id,
        onboarding.CompanyId,
        Step1Completed = onboarding.Step1Completed ? 1 : 0,
        Step2Completed = onboarding.Step2Completed ? 1 : 0,
        Step3Completed = onboarding.Step3Completed ? 1 : 0,
        Step4Completed = onboarding.Step4Completed ? 1 : 0,
        Step5Completed = onboarding.Step5Completed ? 1 : 0,
        Step6Completed = onboarding.Step6Completed ? 1 : 0,
        Step7Completed = onboarding.Step7Completed ? 1 : 0,
        onboarding.OnboardingCompleted
    };

    await _msSql.ExecuteAsync(query, parameters, cancellationToken);
}

public async Task UpdateOnboarding(Guid id, Onboarding onboarding, CancellationToken cancellationToken)
{
    var query = "UPDATE Onboardings " +
                "SET CompanyId = @CompanyId, Step1Completed = @Step1Completed, Step2Completed = @Step2Completed, " +
                "Step3Completed = @Step3Completed, Step4Completed = @Step4Completed, Step5Completed = @Step5Completed, " +
                "Step6Completed = @Step6Completed, Step7Completed = @Step7Completed, OnboardingCompleted = @OnboardingCompleted " +
                "WHERE Id = @Id";

    var parameters = new
    {
        onboarding.CompanyId,
        Step1Completed = onboarding.Step1Completed ? 1 : 0,
        Step2Completed = onboarding.Step2Completed ? 1 : 0,
        Step3Completed = onboarding.Step3Completed ? 1 : 0,
        Step4Completed = onboarding.Step4Completed ? 1 : 0,
        Step5Completed = onboarding.Step5Completed ? 1 : 0,
        Step6Completed = onboarding.Step6Completed ? 1 : 0,
        Step7Completed = onboarding.Step7Completed ? 1 : 0,
        onboarding.OnboardingCompleted,
        Id = id
    };

    await _msSql.ExecuteAsync(query, parameters, cancellationToken);
}

    public async Task<int> DeleteOnboarding(Guid id, CancellationToken cancellationToken)
    {
        var query = "DELETE FROM Onboardings WHERE Id = @Id";
        var parameters = new { Id = id };
        
        return await _msSql.ExecuteAsync(query, parameters, cancellationToken);
    }

    public async Task<bool> IsStepCompleted(Guid id, int stepNumber, CancellationToken cancellationToken)
    {
        var query = $"SELECT Step{stepNumber}Completed FROM Onboardings WHERE Id = @Id";
        var parameters = new { Id = id };

        return await _msSql.QuerySingleOrDefaultAsync<bool>(query, parameters, cancellationToken);
    }

    public async Task<bool> AreAllStepsCompleted(Guid id, CancellationToken cancellationToken)
    {
        var query = "SELECT COUNT(*) FROM Onboardings WHERE Id = @Id AND Step1Completed = 1 AND Step2Completed = 1 " +
                    "AND Step3Completed = 1 AND Step4Completed = 1 AND Step5Completed = 1 " +
                    "AND Step6Completed = 1 AND Step7Completed = 1";
        var parameters = new { Id = id };

        var count = await _msSql.ExecuteScalarAsync<int>(query, parameters, cancellationToken);

        return count > 0;
    }

    public async Task UpdateStepCompleted(Guid id, int stepNumber, bool isCompleted, CancellationToken cancellationToken)
    {
        var stepColumnName = $"Step{stepNumber}Completed";
        var query = $"UPDATE Onboardings SET {stepColumnName} = CAST(@IsCompleted AS BIT) WHERE Id = @Id";
        var parameters = new { Id = id, IsCompleted = isCompleted };

        await _msSql.ExecuteAsync(query, parameters, cancellationToken);
    }

}