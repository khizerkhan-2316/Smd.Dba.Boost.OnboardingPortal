using System.Security.Claims;
using Smd.Dba.Boost.OnboardingPortal.Services;
using Smd.Dba.Boost.OnboardingPortal.Services.Services;

namespace Smd.Dba.Boost.OnboardingPortal.WebApi.Middleware;

public class TokenRefreshMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IUserService _userService;
    private readonly ITokenService _tokenService;


    public TokenRefreshMiddleware(RequestDelegate next, IUserService userService, ITokenService tokenService)
    {
        _next = next;
        _userService = userService;
        _tokenService = tokenService;
    }
    
    
    public async Task InvokeAsync(HttpContext context)
    {
        var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
        if (authHeader != null && authHeader.StartsWith("Bearer "))
        {
            var token = authHeader.Substring("Bearer ".Length);

            var isTokenValid = _tokenService.ValidateToken(token);

            if (isTokenValid)
            {
                var isExpiringSoon = _tokenService.IsAccessTokenExpiringSoon(token);

                if (isExpiringSoon)
                {
                    var principal = _tokenService.GetClaimsPrincipalFromToken(token);

                    var idClaim = principal.FindFirst(ClaimTypes.NameIdentifier);

                    var id = Guid.Parse(idClaim.Value);

                    var user = await _userService.GetUserByIdAsync(id, CancellationToken.None);

                    if (user != null)
                    {
                        var newAccessToken = _tokenService.GenerateToken(user.Id, user.Username, user.Email, user.Role);
                        context.Response.Headers.Add("Authorization", newAccessToken);
                    }
                }
                
            }
        }
       
        await _next.Invoke(context);

    }


    
}