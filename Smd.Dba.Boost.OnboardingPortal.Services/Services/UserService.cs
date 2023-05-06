using AutoMapper;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;
using Smd.Dba.Boost.OnboardingPortal.Services.Services;


namespace Smd.Dba.Boost.OnboardingPortal.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IHashingService _hashingService;
    private readonly IMapper _mapper;


    public UserService(IUserRepository userRepository, IHashingService hashingService, IMapper mapper)
    {
        _userRepository = userRepository;
        _hashingService = hashingService;
        _mapper = mapper;
    }


    public async Task CreateUserAsync(CreateUserDto user, CancellationToken token)
    {
        var emailExists = await _userRepository.IsUserEmailAlreadyTakenAsync(user.Email, token);

        if (emailExists)
        {
            throw new Exception($"A user with email '{user.Email}' already exists.");
        }

        user.Email = user.Email.ToLower().Trim();
        user.Password = _hashingService.HashPassword(user.Password);
        
        await _userRepository.CreateUserAsync(_mapper.Map<User>(user), token);
    }

    public async Task<IEnumerable<UserDto>> GetUsersAsync(CancellationToken token)
    {
        return _mapper.Map<IEnumerable<UserDto>>(await _userRepository.GetUsers(token));
    }

    public async Task<UserDto?> GetUserByIdAsync(Guid id, CancellationToken token)
    {
        return _mapper.Map<UserDto>(await _userRepository.GetUserById(id, token));
    }

    public async Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken)
    {
        return await _userRepository.GetUserByEmailAsync(email, cancellationToken);
    }

    public async Task UpdateUserByIdAsync(Guid id, UserDto user, CancellationToken token)
    {
        var userFromDb = await _userRepository.GetUserById(id, token);

        if (userFromDb == null)
        {
            throw new Exception("User not found.");
        }
        
        user.Email = user.Email.ToLower().Trim();
        
        if (user.Email != userFromDb.Email)
        {
            var emailExists = await _userRepository.IsUserEmailAlreadyTakenAsync(user.Email, token);

            if (emailExists)
            {
                throw new Exception($"A user with email '{user.Email}' already exists.");
            }
        }
        
        await _userRepository.UpdateUserAsync(id, user, token);
    }

    public async Task ResetPasswordByIdAsync(Guid id, string password, CancellationToken token)
    {
        var hashedPassword = _hashingService.HashPassword(password);
        
        await _userRepository.UpdateUserPasswordByIdAsync(id, hashedPassword, token);
    }

    public async Task DeleteUserByIdAsync(Guid id, CancellationToken token)
    {
        var userExits = await _userRepository.UserExistsAsync(id, token);

        if (!userExits)
        {
            throw new Exception("User not found");
        }

        await _userRepository.DeleteUserByIdAsync(id, token);
    }

    
}