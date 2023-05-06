using Smd.Dba.Boost.OnboardingPortal.Client;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.Requests;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Services;

public class EmailService : IEmailService
{
    private readonly IEmailClient _client;
    private readonly ITokenService _tokenService;
    private readonly IUserRepository _userRepository;

    public EmailService(IEmailClient client, ITokenService tokenService, IUserRepository userRepository)
    {
        _client = client;
        _tokenService = tokenService;
        _userRepository = userRepository;
    }


    public async Task SendResetPasswordEmailAsync(ResetPasswordEmailRequest request, CancellationToken token)
    {
        var user = await _userRepository.GetUserByEmailAsync(request.recipientEmail, token);

        if (user != null)
        {
            var jwtToken = _tokenService.GenerateToken(user.Id, user.Username, user.Email, user.Role!);
            
            var resetLink = $"{request.resetPasswordUrl}/{jwtToken}";
            var emailMessage = new EmailMessageDto
            {
                ToEmail = request.recipientEmail,
                Subject = "Nulstil adgangskode",
                Body = $"Følg linket for at nulstille din adgangskode: {resetLink}"
            };
           
            await _client.SendEmailAsync(emailMessage, token);
        }
       
    }
}