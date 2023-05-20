namespace Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;

public class ContactPersonDto
{
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public string Email { get; set; }
    
    public string Telephone { get; set; }
    
    public Guid? CompanyId { get; set; }
}