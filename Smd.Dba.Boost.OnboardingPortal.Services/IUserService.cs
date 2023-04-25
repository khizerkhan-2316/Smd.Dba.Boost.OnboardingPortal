using Smd.Dba.Boost.OnboardingPortal.Contract;

namespace Smd.Dba.Boost.OnboardingPortal.Services;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetUsers(CancellationToken token);
    Task<UserDto?> GetUser(Guid id, CancellationToken token);
}