namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

public class Company
{
    public Guid Id { get; set; }
    
    public string CompanyName { get; set; }
    
    public string? StreetName { get; set; }
    
    public string? PostalCode { get; set; }
    
    public string? City { get; set; }
    
    public string? Cvr { get; set; }
    
    public string? LoginEmail { get; set; }
    
    public string? InvoiceEmail { get; set; }
}