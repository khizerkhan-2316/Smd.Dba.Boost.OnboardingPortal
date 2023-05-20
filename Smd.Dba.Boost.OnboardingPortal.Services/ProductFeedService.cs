using AutoMapper;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

namespace Smd.Dba.Boost.OnboardingPortal.Services;

public class ProductFeedService : IProductFeedService
{
    private readonly IProductFeedRepository _repository;
    private readonly IMapper _mapper;

    public ProductFeedService(IProductFeedRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }


    public async Task CreateProductFeedAsync(ProductFeedDto productFeed, CancellationToken cancellationToken)
    {
        await _repository.InsertProductFeedAsync(_mapper.Map<ProductFeed>(productFeed), cancellationToken);
    }

    public async Task<IEnumerable<ProductFeedDto>> GetProductFeedsAsync(CancellationToken cancellationToken)
    {
        return  _mapper.Map<IEnumerable<ProductFeedDto>>(
            await _repository.GetProductFeedsAsync(cancellationToken));
    }

    public async Task<IEnumerable<ProductFeedDto>> GetProductFeedsByCompanyIdAsync(Guid companyId, CancellationToken cancellationToken)
    {
        return _mapper.Map<IEnumerable<ProductFeedDto>>(
            await _repository.GetProductFeedsByCompanyIdAsync(companyId, cancellationToken));
    }

    public async Task<ProductFeedDto?> GetProductFeedByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return _mapper.Map<ProductFeedDto>(await _repository.GetProductFeedByIdAsync(id, cancellationToken));
    }

    public async Task UpdateProductFeedAsync(Guid id, ProductFeedDto productFeed, CancellationToken cancellationToken)
    {
        await _repository.UpdateProductFeedAsync(id, _mapper.Map<ProductFeed>(productFeed), cancellationToken);
    }

    public async Task<bool> DeleteProductFeedByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var rowsDeleted = await _repository.DeleteProductFeedByIdAsync(id, cancellationToken);

        return rowsDeleted > 0;
    }
}