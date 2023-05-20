using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

public interface ICompanyService
{
    Task CreateCompanyAsync(CompanyDetailDto company, CancellationToken token);
    Task<IEnumerable<CompanyDto>> GetCompaniesAsync(CancellationToken cancellationToken);

    Task<CompanyDetailDto?> GetCompanyByIdAsync(Guid id, CancellationToken cancellationToken);

    Task UpdateCompanyByIdAsync(Guid id, CompanyDetailDto company, CancellationToken cancellationToken);

    Task<bool> DeleteCompanyByIdAsync(Guid id, CancellationToken cancellationToken);
}