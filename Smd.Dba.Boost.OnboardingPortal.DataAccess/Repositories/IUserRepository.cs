using Smd.Dba.Boost.OnboardingPortal.Contract;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

public interface IUserRepository
{
    Task<IEnumerable<UserDto>> GetUsers(CancellationToken token);
    Task<UserDto?> GetUser(Guid id, CancellationToken token);
}