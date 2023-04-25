using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

namespace Smd.Dba.Boost.OnboardingPortal.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;


    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    

    public async Task<IEnumerable<UserDto>> GetUsers(CancellationToken token)
    {
        return await _userRepository.GetUsers(token);
    }

    public async Task<UserDto?> GetUser(Guid id, CancellationToken token)
    {
        return await _userRepository.GetUser(id, token);
    }
}