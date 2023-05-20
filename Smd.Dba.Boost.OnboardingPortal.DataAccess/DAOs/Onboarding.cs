namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

public class Onboarding
{
    public Guid Id { get; set; }
    public Guid CompanyId { get; set; }
    public bool Step1Completed { get; set; }
    public bool Step2Completed { get; set; }
    public bool Step3Completed { get; set; }
    public bool Step4Completed { get; set; }
    public bool Step5Completed { get; set; }
    public bool Step6Completed { get; set; }
    public bool Step7Completed { get; set; }
    public bool OnboardingCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}