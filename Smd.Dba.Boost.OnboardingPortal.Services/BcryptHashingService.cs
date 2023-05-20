using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

namespace Smd.Dba.Boost.OnboardingPortal.Services;

public class BcryptHashingService : IHashingService
{
    public string HashPassword(string password)
    {
        string salt = BCrypt.Net.BCrypt.GenerateSalt(12);
        
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);
        
        return hashedPassword;
    }

    public bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}