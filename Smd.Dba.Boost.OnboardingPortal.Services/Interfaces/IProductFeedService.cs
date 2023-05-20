using System.Collections;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

public interface IProductFeedService
{
    Task CreateProductFeedAsync(ProductFeedDto productFeed, CancellationToken cancellationToken);
    Task<IEnumerable<ProductFeedDto>> GetProductFeedsAsync(CancellationToken cancellationToken);
    Task<IEnumerable<ProductFeedDto>> GetProductFeedsByCompanyIdAsync(Guid companyId,
        CancellationToken cancellationToken);

    Task<ProductFeedDto?> GetProductFeedByIdAsync(Guid id, CancellationToken cancellationToken);
    Task UpdateProductFeedAsync(Guid id, ProductFeedDto productFeed, CancellationToken cancellationToken);
    Task<bool> DeleteProductFeedByIdAsync(Guid id, CancellationToken cancellationToken);

}