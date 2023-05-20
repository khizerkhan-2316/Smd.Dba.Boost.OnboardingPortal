using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;
using Smd.Dba.Boost.OnboardingPortal.Contract.Enums;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

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
    public async Task<IActionResult> CreateCompany(CompanyDetailDto company, CancellationToken token)
    {
        company.Id = Guid.NewGuid();
        await _service.CreateCompanyAsync(company, token);
        return Ok();
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpGet]
    public async Task<IActionResult> GetCompanies(CancellationToken cancellationToken)
    {
        var companies = await _service.GetCompaniesAsync(cancellationToken);

        return companies.Any() ? Ok(companies) : NoContent();
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCompanyById([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var company = await _service.GetCompanyByIdAsync(id, cancellationToken);

        return company == null ? NotFound() : Ok(company);
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCompanyById([FromRoute] Guid id, [FromBody] CompanyDetailDto company, CancellationToken cancellationToken)
    {
        await _service.UpdateCompanyByIdAsync(id, company, cancellationToken);
        return Ok();
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCompanyById([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var isDeleted = await _service.DeleteCompanyByIdAsync(id, cancellationToken);

        return isDeleted ? Ok() : NotFound();
    }
    
}