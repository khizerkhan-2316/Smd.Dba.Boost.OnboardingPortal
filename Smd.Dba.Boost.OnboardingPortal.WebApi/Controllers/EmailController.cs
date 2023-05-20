using Microsoft.AspNetCore.Mvc;
using Smd.Dba.Boost.OnboardingPortal.Contract.Requests;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

namespace Smd.Dba.Boost.OnboardingPortal.WebApi.Controllers;

[ApiController]
[Route("api/v1/emails")]
[Produces("application/json")]

public class EmailController : ControllerBase
{
    private readonly IEmailService _service;


    public EmailController(IEmailService service)
    {
        _service = service;
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> SendResetPasswordEmail(ResetPasswordEmailRequest request, CancellationToken token)
    {
        await _service.SendResetPasswordEmailAsync(request, token);
        
        return Ok();
    }
    
    
}