using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;

public interface IProductFeedRepository
{
     Task InsertProductFeedAsync(ProductFeed productFeed, CancellationToken cancellationToken);

     Task<IEnumerable<ProductFeed>> GetProductFeedsAsync(CancellationToken cancellationToken);

     Task<IEnumerable<ProductFeed>>
          GetProductFeedsByCompanyIdAsync(Guid companyId, CancellationToken cancellationToken);

     Task<ProductFeed?> GetProductFeedByIdAsync(Guid id, CancellationToken cancellationToken);

     Task UpdateProductFeedAsync(Guid id, ProductFeed productFeed, CancellationToken cancellationToken);

     Task<int> DeleteProductFeedByIdAsync(Guid id, CancellationToken cancellationToken);


}