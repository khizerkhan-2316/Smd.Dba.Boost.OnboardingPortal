using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Smd.Dba.Boost.OnboardingPortal.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/onboardings")]
[Produces("application/json")]
public class OnboardingController: ControllerBase
{
    
}