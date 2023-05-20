namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

public class ContactPerson
{
    
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Telephone { get; set; }
    public Guid? CompanyId { get; set; }
    
}