using Smd.Dba.Boost.OnboardingPortal.DataAccess;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;
using Smd.Dba.Boost.OnboardingPortal.Services;
using Smd.Dba.Boost.OnboardingPortal.WebApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddAppsettingsConfiguration();
builder.Services.AddMsSql("imssql");

builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IUserService, UserService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();



app.Run();