using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.Enums;
using Smd.Dba.Boost.OnboardingPortal.Services.Services;

namespace Smd.Dba.Boost.OnboardingPortal.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/companies")]
[Produces("application/json")]


public class CompanyController : ControllerBase
{
    private readonly ICompanyService _service;

    public CompanyController(ICompanyService service)
    {
        _service = service;
    }
    
    [Authorize(Roles = nameof(Role.Admin))]
    [HttpPost]
    public async Task<IActionResult> CreateCompany(CompanyDto company, CancellationToken token)
    {
        await _service.CreateCompanyAsync(company, token);
        return Ok();
    }
}