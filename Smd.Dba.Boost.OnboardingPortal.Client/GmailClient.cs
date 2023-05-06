
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Smd.Dba.Boost.OnboardingPortal.Contract;

namespace Smd.Dba.Boost.OnboardingPortal.Client;

public class GmailClient : IEmailClient
{
    private readonly IConfiguration  _configuration;
    private readonly EmailClientSettings _emailClientSettings;
    
        

    public GmailClient(IConfiguration configuration)
    {
        _configuration = configuration;
        _emailClientSettings = _configuration.GetSection("EmailClientSettings").Get<EmailClientSettings>();
    }


    public async Task SendEmailAsync(EmailMessageDto emailMessage, CancellationToken cancellationToken)
    {
        using var client = new SmtpClient("smtp.gmail.com", 587);
        client.EnableSsl = true;
        client.DeliveryMethod = SmtpDeliveryMethod.Network;
        client.UseDefaultCredentials = false;
        client.Credentials = new NetworkCredential(_emailClientSettings.Username, _emailClientSettings.AppPassword);

        using var message = new MailMessage(EmailMessageDto.FromEmail, emailMessage.ToEmail);
        message.Subject = emailMessage.Subject;
        message.Body = emailMessage.Body;

        await client.SendMailAsync(message, cancellationToken);
    }
}