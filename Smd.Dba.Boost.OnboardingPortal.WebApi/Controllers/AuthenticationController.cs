using Microsoft.AspNetCore.Mvc;
using Smd.Dba.Boost.OnboardingPortal.Contract.Requests;
using Smd.Dba.Boost.OnboardingPortal.Services;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

namespace Smd.Dba.Boost.OnboardingPortal.WebApi.Controllers;

[ApiController]
[Route("/api/v1/authentication")]
[Produces("application/json")]

public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _service;

    public AuthenticationController(IAuthenticationService service)
    {
        _service = service;
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest, CancellationToken cancellationToken)
    {
        var authenticationResponse  = await _service.AutenticateUser(loginRequest, cancellationToken);
        return Ok(authenticationResponse);
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        string authorizationHeader = HttpContext.Request.Headers["Authorization"];
        string token = authorizationHeader.Split(" ").Last();

        await _service.ResetPasswordByClaimsAsync(token, request.Password, cancellationToken);

        return Ok();

    }

    [HttpPost("verify")]
    public IActionResult VerifyToken([FromBody] VerifyTokenRequest request)
    {
        var verifyTokenResponse = _service.VerifyToken(request.Token);

        return verifyTokenResponse.IsValid ? Ok(verifyTokenResponse) : Unauthorized(verifyTokenResponse);

    }
}