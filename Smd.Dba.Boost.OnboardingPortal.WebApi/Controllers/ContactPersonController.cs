using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;
using Smd.Dba.Boost.OnboardingPortal.Contract.Enums;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

namespace Smd.Dba.Boost.OnboardingPortal.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/contactpersons")]
[Produces("application/json")]
public class ContactPersonController : ControllerBase
{
    private readonly IContactPersonService _service;

    public ContactPersonController(IContactPersonService service)
    {
        _service = service;
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpPost]
    public async Task<IActionResult> CreateContactPerson([FromBody] ContactPersonDto contactPerson,
        CancellationToken cancellationToken)
    {
        contactPerson.Id = Guid.NewGuid();
        await _service.CreateContactPersonAsync(contactPerson, cancellationToken);

        return Ok();
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpGet]
    public async Task<IActionResult> GetContactPersons([FromQuery] Guid? companyId, CancellationToken cancellationToken)
    {
        IEnumerable<ContactPersonDto> contactPersons;
    
        if (companyId.HasValue)
        {
            contactPersons = await _service.GetContactPersonByCompanyIdAsync(companyId.Value, cancellationToken);
        }
        else
        {
            contactPersons = await _service.GetContactPersonsAsync(cancellationToken);
        }

        return contactPersons.Any() ? Ok(contactPersons) : NotFound();
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetContactPersonById([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var contactPerson = await _service.GetContactPersonByIdAsync(id, cancellationToken);


        return contactPerson != null ? Ok(contactPerson) : NotFound();
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateContactPersonById([FromRoute] Guid id, [FromBody] ContactPersonDto contactPerson, CancellationToken cancellationToken)
    {
        await _service.UpdateContactPersonAsync(id, contactPerson, cancellationToken);

        return Ok();
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContactPersonById([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var isDeleted = await _service.DeleteContactPersonByIdAsync(id, cancellationToken);

        return isDeleted ? Ok() : NotFound();
    }

}