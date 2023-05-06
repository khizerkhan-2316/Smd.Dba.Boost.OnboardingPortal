using Smd.Dba.Boost.OnboardingPortal.Contract;

namespace Smd.Dba.Boost.OnboardingPortal.Client;

public interface IEmailClient
{
    Task SendEmailAsync(EmailMessageDto emailMessage,CancellationToken cancellationToken);
}