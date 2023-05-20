namespace Smd.Dba.Boost.OnboardingPortal.Client;

public class EmailClientSettings
{
    public string Username = Environment.GetEnvironmentVariable("APP_EMAIL");

    public string AppPassword = Environment.GetEnvironmentVariable("APP_PASSWORD");
}