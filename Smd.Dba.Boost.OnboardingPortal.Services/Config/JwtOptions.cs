namespace Smd.Dba.Boost.OnboardingPortal.Services.Config;

public class JwtOptions
{
    public string Secret { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public int ExpirationInMinutes { get; set; }
    public int RefreshTokenExpirationMinutes { get; set; }
}