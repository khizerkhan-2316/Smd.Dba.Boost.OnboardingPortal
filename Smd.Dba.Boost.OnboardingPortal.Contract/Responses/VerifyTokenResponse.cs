namespace Smd.Dba.Boost.OnboardingPortal.Contract.Responses;

public class VerifyTokenResponse
{
    public bool IsValid { get; set; }
    public string? Message { get; set; }
}