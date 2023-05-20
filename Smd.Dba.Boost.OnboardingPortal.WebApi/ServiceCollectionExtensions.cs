using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Smd.Dba.Boost.OnboardingPortal.Services.Config;

namespace Smd.Dba.Boost.OnboardingPortal.WebApi;

public static class ServiceCollectionExtensions
{
    public static void AddAppsettingsConfiguration(this IServiceCollection services)
    {
        services.AddSingleton<IConfiguration>(new ConfigurationBuilder()
            .AddEnvironmentVariables()
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build());

    }

    public static void AddJwtAutentication(this IServiceCollection services, IConfiguration configuration)
    {
        
        var jwtSettings = configuration.GetSection("JwtSettings").Get<JwtOptions>();
        jwtSettings.Secret = Environment.GetEnvironmentVariable("JWT_SECRET");
        var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);
        
        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ClockSkew = TimeSpan.Zero
                };
            });
    }

    public static void AddCorsAndPolicy(this IServiceCollection services)
    {
        services.AddCors(options =>
        {

            options.AddPolicy("AllowAnyOrigin",

                corsPolicyBuilder =>
                {

                    corsPolicyBuilder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
    
        });
    }

    public static void AddSwaggerGenWithSecurity(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Smd.Dba.Boost.OnboardingPortal.WebApi", Version = "v1" });

            // Add JWT Bearer token authentication support
            var securityScheme = new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Description = "Enter JWT Bearer token",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            };

            c.AddSecurityDefinition("Bearer", securityScheme);

            var securityRequirement = new OpenApiSecurityRequirement
            {
                { securityScheme, new[] { "Bearer" } }
            };

            c.AddSecurityRequirement(securityRequirement);
        });
    }
}