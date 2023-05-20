using Smd.Dba.Boost.OnboardingPortal.Contract.Enums;

namespace Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;

public class ProductFeedDto
{
    
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public ProductFeedType ProductFeedType { get; set; }
    public string Url { get; set; }
    public Guid CompanyId { get; set; }
    
}