using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;

namespace Smd.Dba.Boost.OnboardingPortal.Client;

public interface IEmailClient
{
    Task SendEmailAsync(EmailMessageDto emailMessage,CancellationToken cancellationToken);
}