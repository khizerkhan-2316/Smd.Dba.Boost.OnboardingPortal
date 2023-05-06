using System.Security.Claims;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Services;

public interface ITokenService
{
    string GenerateToken(Guid id, string username, string email, string role);

    string GenerateRefreshToken(Guid id, string username, string email, string role);
    
    bool ValidateToken(string jwtToken);
    
    bool IsAccessTokenExpiringSoon(string token);

    ClaimsPrincipal GetClaimsPrincipalFromToken(string jwtToken);
}