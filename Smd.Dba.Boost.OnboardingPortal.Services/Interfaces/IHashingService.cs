namespace Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

public interface IHashingService
{
    string HashPassword(string password);
    bool VerifyPassword(string password, string hashedPassword);
}