using AutoMapper;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

namespace Smd.Dba.Boost.OnboardingPortal.Services;

public class OnboardingService : IOnboardingService
{


    private readonly IOnboardingRepository _repository;
    private readonly IMapper _mapper;

    public OnboardingService(IOnboardingRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }
}