using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;
using Smd.Dba.Boost.OnboardingPortal.Contract.Enums;
using Smd.Dba.Boost.OnboardingPortal.Services;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

namespace Smd.Dba.Boost.OnboardingPortal.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("/api/v1/users")]
[Produces("application/json")]


public class UserController : ControllerBase
{

    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpPost]
    public async Task<ActionResult> CreateUser([FromBody] CreateUserDto user, CancellationToken token)
    {
        try
        {
            user.Id = Guid.NewGuid();
            await _userService.CreateUserAsync(user, token);
            return Ok();
        }
        catch (Exception e)
        {
            return Conflict(e.Message); 

        }

        
    }
    
    [Authorize(Roles = nameof(Role.Admin))]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers([FromQuery] Guid? companyId, CancellationToken token)
    {

        IEnumerable<UserDto> users;


        if (companyId.HasValue)
        {
            users = await _userService.GetUsersByCompanyIdAsync(companyId.Value, token);
        }
        else
        {
            users = await _userService.GetUsersAsync(token);

        }

        return users.Any() ? Ok(users) : NotFound();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUserById([FromRoute] Guid id, CancellationToken token)
    {
        var user = await _userService.GetUserByIdAsync(id, token);

        return user != null ? Ok(user) : NotFound();
    }
    
    
    //Update
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateUserById([FromRoute] Guid id, [FromBody] UserDto user, CancellationToken token)
    {
        await _userService.UpdateUserByIdAsync(id, user, token);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserById([FromRoute] Guid id, CancellationToken token)
    {
        await _userService.DeleteUserByIdAsync(id, token);
        return Ok();
    }

}