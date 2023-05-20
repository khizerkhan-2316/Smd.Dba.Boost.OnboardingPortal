using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;

public interface ICompanyRepository
{
    Task CreateCompanyAsync(Company company, CancellationToken token);
    Task<IEnumerable<Company>> GetCompaniesAsync(CancellationToken cancellationToken);
    Task<Company?> GetCompanyByIdAsync(Guid id, CancellationToken cancellationToken);

    Task UpdateCompanyByIdAsync(Guid id, Company company, CancellationToken cancellationToken);

    Task<int> DeleteCompanyByIdAsync(Guid id, CancellationToken cancellationToken);
}