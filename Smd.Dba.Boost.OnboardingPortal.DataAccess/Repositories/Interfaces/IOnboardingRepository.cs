using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;

public interface IOnboardingRepository
{
    Task<Onboarding?> GetById(Guid id, CancellationToken cancellationToken);
    Task<IEnumerable<Onboarding>> GetOnboardings(CancellationToken cancellationToken);
    Task AddOnboarding(Onboarding onboarding, CancellationToken cancellationToken);
    Task UpdateOnboarding(Guid id, Onboarding onboarding, CancellationToken cancellationToken);
    Task<int> DeleteOnboarding(Guid guid, CancellationToken cancellationToken);
    
    Task<bool> IsStepCompleted(Guid id, int stepNumber, CancellationToken cancellationToken);
    Task<bool> AreAllStepsCompleted(Guid id, CancellationToken cancellationToken);
        
    Task UpdateStepCompleted(Guid id, int stepNumber, bool isCompleted, CancellationToken cancellationToken);
}