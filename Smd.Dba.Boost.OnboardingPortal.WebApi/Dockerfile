FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Smd.Dba.Boost.OnboardingPortal.WebApi/Smd.Dba.Boost.OnboardingPortal.WebApi.csproj", "Smd.Dba.Boost.OnboardingPortal.WebApi/"]
RUN dotnet restore "Smd.Dba.Boost.OnboardingPortal.WebApi/Smd.Dba.Boost.OnboardingPortal.WebApi.csproj"
COPY . .
WORKDIR "/src/Smd.Dba.Boost.OnboardingPortal.WebApi"
RUN dotnet build "Smd.Dba.Boost.OnboardingPortal.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Smd.Dba.Boost.OnboardingPortal.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Smd.Dba.Boost.OnboardingPortal.WebApi.dll"]
