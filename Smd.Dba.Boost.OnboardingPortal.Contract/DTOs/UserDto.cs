namespace Smd.Dba.Boost.OnboardingPortal.Contract;

public class UserDto
{
    public Guid Id { get; set; }
    
    public string Username { get; set; }
    public string Email { get; set; }
    
    public Guid RoleId { get; set; }
    
    public string Role { get; set; }
    
    public Guid? CompanyId { get; set; }
    
}