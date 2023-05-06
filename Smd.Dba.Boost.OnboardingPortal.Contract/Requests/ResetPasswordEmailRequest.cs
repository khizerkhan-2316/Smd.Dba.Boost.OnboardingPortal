namespace Smd.Dba.Boost.OnboardingPortal.Contract.Requests;

public class ResetPasswordEmailRequest
{
    
    public string recipientEmail { get; set; }
    public string resetPasswordUrl { get; set; }
}