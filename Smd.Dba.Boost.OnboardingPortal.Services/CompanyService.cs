using AutoMapper;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

namespace Smd.Dba.Boost.OnboardingPortal.Services;

public class CompanyService : ICompanyService
{
    private readonly ICompanyRepository _repository;
    private readonly IMapper _mapper;

    public CompanyService(ICompanyRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task CreateCompanyAsync(CompanyDetailDto company, CancellationToken token)
    {
        await _repository.CreateCompanyAsync(_mapper.Map<Company>(company), token);
    }

    public async Task<IEnumerable<CompanyDto>> GetCompaniesAsync(CancellationToken cancellationToken)
    {
        return _mapper.Map<IEnumerable<CompanyDto>>(await _repository.GetCompaniesAsync(cancellationToken));
    }

    public async Task<CompanyDetailDto?> GetCompanyByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return _mapper.Map<CompanyDetailDto>(await _repository.GetCompanyByIdAsync(id, cancellationToken));
    }

    public async Task UpdateCompanyByIdAsync(Guid id, CompanyDetailDto company, CancellationToken cancellationToken)
    {
        await _repository.UpdateCompanyByIdAsync(id, _mapper.Map<Company>(company), cancellationToken);
    }

    public async Task<bool> DeleteCompanyByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var deletedRows = await _repository.DeleteCompanyByIdAsync(id, cancellationToken);

        return deletedRows > 0;
    }
}