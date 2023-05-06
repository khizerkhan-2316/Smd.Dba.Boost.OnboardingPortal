using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

public interface ICompanyRepository
{
    Task CreateCompanyAsync(Company company, CancellationToken token);
}