using AutoMapper;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Profiles;

public class ProductFeedMappingProfile : Profile
{

    public ProductFeedMappingProfile()
    {
        CreateMap<ProductFeedDto, ProductFeed>().ReverseMap();
    }
}