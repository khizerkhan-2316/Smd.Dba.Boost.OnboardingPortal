using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

public interface IUserRepository
{
    Task CreateUserAsync(User user, CancellationToken token);
    Task<IEnumerable<User>> GetUsers(CancellationToken token);
    Task<User?> GetUserById(Guid id, CancellationToken token);
    Task<User?> GetUserByEmailAsync(string email, CancellationToken token);
    Task<bool> IsUserEmailAlreadyTakenAsync(string email, CancellationToken token);
    Task<bool> UserExistsAsync(Guid id, CancellationToken token);
    Task UpdateUserAsync(Guid id, UserDto user, CancellationToken token);

    Task UpdateUserPasswordByIdAsync(Guid id, string password, CancellationToken cancellationToken);
    Task DeleteUserByIdAsync(Guid id, CancellationToken token);
}