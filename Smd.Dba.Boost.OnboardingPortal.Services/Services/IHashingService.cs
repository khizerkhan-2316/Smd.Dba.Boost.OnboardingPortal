namespace Smd.Dba.Boost.OnboardingPortal.Services.Services;

public interface IHashingService
{
    string HashPassword(string password);
    bool VerifyPassword(string password, string hashedPassword);
}