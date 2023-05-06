using Smd.Dba.Boost.OnboardingPortal.Contract.Requests;
using Smd.Dba.Boost.OnboardingPortal.Contract.Responses;

namespace Smd.Dba.Boost.OnboardingPortal.Services;

public interface IAuthenticationService
{
    Task<AuthenticationResponse> AutenticateUser(LoginRequest loginRequest, CancellationToken token);
    
    Task ResetPasswordByClaimsAsync(string token, string password, CancellationToken cancellationToken);
    
    VerifyTokenResponse VerifyToken(string token);
}