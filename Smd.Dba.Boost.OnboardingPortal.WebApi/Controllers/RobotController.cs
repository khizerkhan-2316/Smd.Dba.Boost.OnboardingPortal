using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Smd.Dba.Boost.OnboardingPortal.Contract.Enums;

namespace Smd.Dba.Boost.OnboardingPortal.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/robots")]
[Produces("application/json")]
public class RobotController : ControllerBase
{
 /*
    [Authorize(Roles = nameof(Role.Admin))]
    [HttpPost]
    public async Task<IActionResult> CreateRobot(CancellationToken cancellationToken)
    {
        
    }
     */
}