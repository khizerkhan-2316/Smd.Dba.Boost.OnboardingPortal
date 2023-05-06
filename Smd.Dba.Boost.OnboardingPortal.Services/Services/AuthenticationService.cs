using System.Security.Claims;
using Smd.Dba.Boost.OnboardingPortal.Contract.Requests;
using Smd.Dba.Boost.OnboardingPortal.Contract.Responses;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IUserService _userService;
    private readonly ITokenService _tokenService;
    private readonly IHashingService _hashingService;

    public AuthenticationService(IUserService userService, ITokenService tokenService, IHashingService hashingService)
    {
        _userService = userService;
        _tokenService = tokenService;
        _hashingService = hashingService;
    }
    
    public async Task<AuthenticationResponse> AutenticateUser(LoginRequest loginRequest, CancellationToken token)
    {
        var user = await _userService.GetUserByEmailAsync(loginRequest.Email, token);

        if (user == null)
        {
            throw new Exception("User not found");
        }
        
        if (!_hashingService.VerifyPassword(loginRequest.Password, user.Password))
        {
            throw new UnauthorizedAccessException("Invalid Email or Password");
        }

        var jwtToken = _tokenService.GenerateToken(user.Id, user.Username, user.Email, user.Role!);

        return new AuthenticationResponse{Token = jwtToken, Role = user.Role! };

    }
    

    public async Task ResetPasswordByClaimsAsync(string token, string password, CancellationToken cancellationToken)
    {
        var principal = _tokenService.GetClaimsPrincipalFromToken(token);
        
        var idClaim = principal.FindFirst(ClaimTypes.NameIdentifier);

        if (idClaim == null)
        {
            throw new Exception("Invalid token claims");

        }
        
        var id = Guid.Parse(idClaim.Value);
        
        await _userService.ResetPasswordByIdAsync(id, password, cancellationToken);
    }

    public  VerifyTokenResponse VerifyToken(string token)
    {
        var isTokenValid = _tokenService.ValidateToken(token);

        return new VerifyTokenResponse
        {
            IsValid = isTokenValid,
            Message = isTokenValid ? "Token is Valid" : "Token is invalid"
        };
    }
}