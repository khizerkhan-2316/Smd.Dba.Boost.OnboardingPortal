using AutoMapper;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Profiles;

public class ContactPersonMappingProfile : Profile
{
    public ContactPersonMappingProfile()
    {
        CreateMap<ContactPersonDto, ContactPerson>().ReverseMap();
    }
}