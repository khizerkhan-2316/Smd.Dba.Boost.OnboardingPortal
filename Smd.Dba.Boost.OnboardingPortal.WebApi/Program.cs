using Smd.Dba.Boost.OnboardingPortal.Client;
using Smd.Dba.Boost.OnboardingPortal.DataAccess;
using Smd.Dba.Boost.OnboardingPortal.Services;
using Smd.Dba.Boost.OnboardingPortal.WebApi;
using Smd.Dba.Boost.OnboardingPortal.WebApi.Middleware;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGenWithSecurity();
builder.Services.AddAppsettingsConfiguration();
builder.Services.AddCorsAndPolicy();

var configuration = builder.Configuration;
builder.Services.AddJwtAutentication(configuration);


builder.Services.AddServices();
builder.Services.AddAutoMapper();

builder.Services.AddClients();


builder.Services.AddMsSql("imssql");
builder.Services.AddRepositories();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiddleware<TokenRefreshMiddleware>();
app.UseAuthorization();
app.UseCors("AllowAnyOrigin");
app.MapControllers();

app.Run();