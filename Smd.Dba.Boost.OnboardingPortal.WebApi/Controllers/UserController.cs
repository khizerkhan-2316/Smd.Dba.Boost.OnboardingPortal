using Microsoft.AspNetCore.Mvc;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Services;

namespace Smd.Dba.Boost.OnboardingPortal.WebApi.Controllers;

[ApiController]
[Route("/api/v1/users")]

public class UserController : ControllerBase
{

    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    //Create 
    
    //Read
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers(CancellationToken token)
    {
        var users = await _userService.GetUsers(token);

        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser([FromRoute] Guid id, CancellationToken token)
    {
        var user = await _userService.GetUser(id, token);

        return user != null ? Ok(user) : NotFound();
    }
    
    
    
    //Update
    
    //Delete
    
}