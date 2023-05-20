using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

public interface IUserService
{
    Task CreateUserAsync(CreateUserDto user, CancellationToken token);
    Task<IEnumerable<UserDto>> GetUsersAsync(CancellationToken token);

    Task<IEnumerable<UserDto>> GetUsersByCompanyIdAsync(Guid companyId, CancellationToken cancellationToken);
    Task<UserDto?> GetUserByIdAsync(Guid id, CancellationToken token);
    Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken);
    Task UpdateUserByIdAsync(Guid id, UserDto user, CancellationToken token);

    Task ResetPasswordByIdAsync(Guid id, string password, CancellationToken token);
    Task DeleteUserByIdAsync(Guid id, CancellationToken token);
}