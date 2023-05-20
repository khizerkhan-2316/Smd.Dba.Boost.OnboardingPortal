namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

public class Robot
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid ShopId { get; set; }
    public Guid CustomerId { get; set; }
    public string? ListingIdBeforeText { get; set; }
    public string? ListingIdAfterText { get; set; }
    public string? ProductFeedUrl { get; set; }
    public Guid CompanyId { get; set; }
    public Guid ProductFeedId { get; set; }
    
}