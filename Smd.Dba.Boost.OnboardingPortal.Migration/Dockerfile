FROM mcr.microsoft.com/dotnet/runtime:7.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Smd.Dba.Boost.OnboardingPortal.Migration/Smd.Dba.Boost.OnboardingPortal.Migration.csproj", "Smd.Dba.Boost.OnboardingPortal.Migration/"]
RUN dotnet restore "Smd.Dba.Boost.OnboardingPortal.Migration/Smd.Dba.Boost.OnboardingPortal.Migration.csproj"
COPY . .
WORKDIR "/src/Smd.Dba.Boost.OnboardingPortal.Migration"
RUN dotnet build "Smd.Dba.Boost.OnboardingPortal.Migration.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Smd.Dba.Boost.OnboardingPortal.Migration.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Smd.Dba.Boost.OnboardingPortal.Migration.dll"]
