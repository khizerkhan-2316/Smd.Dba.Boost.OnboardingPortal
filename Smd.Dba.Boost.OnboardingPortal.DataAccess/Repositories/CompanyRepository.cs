using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;
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
}