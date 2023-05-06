using Smd.Dba.Boost.OnboardingPortal.Contract;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Services;

public interface ICompanyService
{
    Task CreateCompanyAsync(CompanyDto company, CancellationToken token);
}