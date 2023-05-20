using AutoMapper;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

namespace Smd.Dba.Boost.OnboardingPortal.Services;

public class RobotService : IRobotService
{
    private readonly IRobotRepository _repository;
    private readonly IMapper _mapper;

    public RobotService(IRobotRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }
    
    
    
    
}