namespace Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;

public class CompanyDetailDto : CompanyDto
{
    public string? StreetName { get; set; }
    public string? PostalCode { get; set; }
    public string? City { get; set; }
    public string? LoginEmail { get; set; }
    public string? InvoiceEmail { get; set; }
}