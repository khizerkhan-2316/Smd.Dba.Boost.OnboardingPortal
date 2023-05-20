using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

public class ProductFeedRepository : IProductFeedRepository
{
    private readonly IMsSql _msSql;

    public ProductFeedRepository(IMsSql msSql)
    {
        _msSql = msSql;
    }

    public async Task InsertProductFeedAsync(ProductFeed productFeed, CancellationToken cancellationToken)
    {
        string query = @"
            INSERT INTO ProductFeeds (Id, Title, Description, ProductFeedType, url, CompanyId)
            VALUES (@Id, @Title, @Description, @ProductFeedType, @url, @CompanyId);
        ";

        var args = new
        {
            productFeed.Id,
            productFeed.Title,
            productFeed.Description,
            ProductFeedType = productFeed.ProductFeedType.ToString(), 
            productFeed.Url,
            productFeed.CompanyId
        };

        await _msSql.ExecuteAsync(query, args, cancellationToken);

    }

    public async Task<IEnumerable<ProductFeed>> GetProductFeedsAsync(CancellationToken cancellationToken)
    {
        const string sql = @"SELECT Id, Title, Description, ProductFeedType, Url, CompanyId FROM ProductFeeds";

        return await _msSql.QueryAsync<ProductFeed>(sql, cancellationToken);
    }

    public async Task<IEnumerable<ProductFeed>> GetProductFeedsByCompanyIdAsync(Guid companyId, CancellationToken cancellationToken)
    {
        const string sql = @"SELECT Id, Title, Description, ProductFeedType, Url, CompanyId FROM ProductFeeds WHERE CompanyId = @companyId";

        var args = new
        {
          companyId
        };

        return await _msSql.QueryAsync<ProductFeed>(sql, args, cancellationToken);
    }

    public async Task<ProductFeed?> GetProductFeedByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        const string sql = @"SELECT Id, Title, Description, ProductFeedType, Url, CompanyId FROM ProductFeeds WHERE Id = @id";

        var args = new
        {
            id
        };

        return await _msSql.QuerySingleOrDefaultAsync<ProductFeed>(sql, args, cancellationToken);
    }

    public async Task UpdateProductFeedAsync(Guid id, ProductFeed productFeed, CancellationToken cancellationToken)
    {
        productFeed.Id = id;

        const string sql = @"UPDATE ProductFeeds
                            SET 
                                [Title] = @Title,
                                [Description] = @Description,
                                [ProductFeedType] = @ProductFeedType,
                                [Url] = @Url,
                                WHERE
                                    [Id] = @Id";
        
        var args = new
        {
            productFeed.Title,
            productFeed.Description,
            ProductFeedType = productFeed.ProductFeedType.ToString(),
            productFeed.Url,
            productFeed.Id
        };

        await _msSql.ExecuteAsync(sql, args, cancellationToken);
    }

    public async Task<int> DeleteProductFeedByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        const string sql = "DELETE FROM ProductFeeds WHERE Id = @id";

        var args = new
        {
           id
        };

        return await _msSql.ExecuteAsync(sql, args, cancellationToken);
    }
}