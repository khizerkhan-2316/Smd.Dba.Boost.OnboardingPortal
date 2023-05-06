using AutoMapper;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Profiles;

public class CompanyMappingProfile : Profile
{
    public CompanyMappingProfile()
    {
        CreateMap<CompanyDto, Company>().ReverseMap();
    }
}