using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

public class CompanyRepository : ICompanyRepository
{
    private readonly IMsSql _msSql;

    public CompanyRepository(IMsSql msSql)
    {
        _msSql = msSql;
    }
    
    public async Task CreateCompanyAsync(Company company, CancellationToken token)
    {
        const string sql = @"
                INSERT INTO [dbo].[Companies] ([Id], [CompanyName], [StreetName], [PostalCode], [City], [Telephone], [Cvr], [LoginEmail], [InvoiceEmail])
                VALUES (@Id, @CompanyName, @StreetName, @PostalCode, @City, @Telephone, @Cvr, @LoginEmail, @InvoiceEmail)";

        await _msSql.ExecuteAsync(sql, company, token);
    }

    public async Task<IEnumerable<Company>> GetCompaniesAsync(CancellationToken cancellationToken)
    {
        const string sql =
            @"SELECT Id, CompanyName, Telephone, Cvr FROM Companies";

        return await _msSql.QueryAsync<Company>(sql, cancellationToken);
    }

    public async Task<Company?> GetCompanyByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        const string sql =
            @"SELECT Id, CompanyName, StreetName, PostalCode, City, Telephone, Cvr, LoginEmail, InvoiceEmail FROM Companies
              where Id = @id";

        var args = new
        {
         id
        };
        return await _msSql.QuerySingleOrDefaultAsync<Company>(sql, args, cancellationToken);
    }

    public async Task UpdateCompanyByIdAsync(Guid id, Company company, CancellationToken cancellationToken)
    {
        company.Id = id;
        const string sql = @"
    UPDATE Companies
    SET 
        [CompanyName] = @CompanyName,
        [StreetName] = @StreetName,
        [PostalCode] = @PostalCode,
        [City] = @City,
        [Telephone] = @Telephone,
        [Cvr] = @Cvr,
        [LoginEmail] = @LoginEmail,
        [InvoiceEmail] = @InvoiceEmail
    WHERE
        [Id] = @Id";

        await _msSql.ExecuteAsync(sql, company, cancellationToken);
    }

    public async Task<int> DeleteCompanyByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        const string sql = $"DELETE FROM Companies where Id = @id";

        var args = new
        {
            id
        };
        
        return await _msSql.ExecuteAsync(sql, args, cancellationToken);
    }
}