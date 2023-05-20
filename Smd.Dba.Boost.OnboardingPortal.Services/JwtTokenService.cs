using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Smd.Dba.Boost.OnboardingPortal.Services.Config;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

namespace Smd.Dba.Boost.OnboardingPortal.Services;

public class JwtTokenService : ITokenService
{
    private readonly IConfiguration _configuration;
    private readonly JwtOptions _jwtOptions;

    public JwtTokenService(IConfiguration configuration)
    {
        _configuration = configuration;
        _jwtOptions = _configuration.GetSection("JwtSettings").Get<JwtOptions>();  
        _jwtOptions.Secret = Environment.GetEnvironmentVariable("JWT_SECRET");
    }
    
    public string GenerateToken(Guid id, string username, string email, string role)
    {
        
        var claims = GetClaims(id, username, email, role);
        
        var key = Encoding.ASCII.GetBytes(_jwtOptions.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(_jwtOptions.ExpirationInMinutes),
            Issuer = _jwtOptions.Issuer,
            Audience = _jwtOptions.Audience,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };
        
        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtToken = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(jwtToken);
    }

    

    public bool ValidateToken(string jwtToken)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        var validationParameters = GetValidationParameters();
        
        try
        {
            tokenHandler.ValidateToken(jwtToken, validationParameters, out var securityToken);
            return true;
        }
        catch (SecurityTokenException e)
        { 
            return false;
        }
    }

    public bool IsAccessTokenExpiringSoon(string token)
    {
        var validationParamters = GetValidationParameters();
        
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            tokenHandler.ValidateToken(token, validationParamters, out var validatedToken);

            if (validatedToken.ValidTo.ToLocalTime() < DateTime.UtcNow.AddMinutes(_jwtOptions.ExpirationInMinutes / 2))
            {
                return true;
            }

            return false;
        }
        catch (SecurityTokenException)
        {
            return false;
        }
    }

    public ClaimsPrincipal GetClaimsPrincipalFromToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtOptions.Secret);

        try
        {
            var validationParameters = GetValidationParameters();
            var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
        
            // Return the validated token's ClaimsPrincipal, which contains the token's claims
            return claimsPrincipal;
        }
        catch (Exception ex)
        {
            throw new SecurityTokenException("Token validation failed", ex);
        }
    }
    
    
    
    private TokenValidationParameters GetValidationParameters()
    {
        var key = Encoding.ASCII.GetBytes(_jwtOptions.Secret);
        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = _jwtOptions.Issuer,
            ValidateAudience = true,
            ValidAudience = _jwtOptions.Audience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };

        return validationParameters;
    }

    private IEnumerable<Claim> GetClaims(Guid id, string username, string email, string role)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, id.ToString()),
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Role, role)
        };

        return claims;
    }


}