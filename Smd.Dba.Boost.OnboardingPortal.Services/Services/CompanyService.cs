using AutoMapper;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Services;

public class CompanyService : ICompanyService
{
    private readonly ICompanyRepository _repository;
    private readonly IMapper _mapper;

    public CompanyService(ICompanyRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task CreateCompanyAsync(CompanyDto company, CancellationToken token)
    {
        await _repository.CreateCompanyAsync(_mapper.Map<Company>(company), token);
    }
}