namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

public class User
{
    public Guid Id { get; set; }
    
    public string Username { get; set; }
    
    
    public string Email { get; set; }
    
    public string Password { get; set; }
    
    public Guid RoleId { get; set; }
    
    public Guid CompanyId { get; set; }

    public string? Role { get; set; }
}