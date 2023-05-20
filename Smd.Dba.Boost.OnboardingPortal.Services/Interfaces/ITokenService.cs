using System.Security.Claims;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

public interface ITokenService
{
    string GenerateToken(Guid id, string username, string email, string role);
    
    bool ValidateToken(string jwtToken);
    
    bool IsAccessTokenExpiringSoon(string token);

    ClaimsPrincipal GetClaimsPrincipalFromToken(string jwtToken);
}