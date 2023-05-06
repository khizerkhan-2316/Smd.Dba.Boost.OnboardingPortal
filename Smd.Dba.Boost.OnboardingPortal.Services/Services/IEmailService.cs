using Smd.Dba.Boost.OnboardingPortal.Contract.Requests;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Services;

public interface IEmailService
{
    Task SendResetPasswordEmailAsync(ResetPasswordEmailRequest request, CancellationToken token );
}