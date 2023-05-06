using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.Enums;
using Smd.Dba.Boost.OnboardingPortal.Services;

namespace Smd.Dba.Boost.OnboardingPortal.WebApi.Controllers;

[ApiController]
//[Authorize]
[Route("/api/v1/users")]
[Produces("application/json")]


public class UserController : ControllerBase
{

    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    //Create 
    //[Authorize(Roles = nameof(Role.Admin))]
    [HttpPost]
    public async Task<ActionResult> CreateUser([FromBody] CreateUserDto user, CancellationToken token)
    {
        try
        {
            await _userService.CreateUserAsync(user, token);
            return Ok();
        }
        catch (Exception e)
        {
            return Conflict(e.Message); 

        }

        
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers(CancellationToken token)
    {
        var users = await _userService.GetUsersAsync(token);

        return Ok(users);
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