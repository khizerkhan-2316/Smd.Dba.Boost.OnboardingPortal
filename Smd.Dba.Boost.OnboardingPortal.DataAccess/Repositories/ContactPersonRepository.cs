using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

public class ContactPersonRepository : IContactPersonRepository
{
    private readonly IMsSql _msSql;

    public ContactPersonRepository(IMsSql msSql)
    {
        _msSql = msSql;
    }
    
    public async Task InsertContactPersonAsync(ContactPerson contactPerson, CancellationToken cancellationToken)
    {
        const string sql = @"INSERT INTO ContactPersons (Id, Name, Email, Telephone, CompanyId)
                             VALUES (@Id, @Name, @Email, @Telephone, @CompanyId)";

        await _msSql.ExecuteAsync(sql, contactPerson, cancellationToken);

    }

    public async Task<IEnumerable<ContactPerson>> GetContactPersonsAsync(CancellationToken cancellationToken)
    {
        const string sql = @"SELECT Id, Name, Email, Telephone, CompanyId FROM ContactPersons";

        return await _msSql.QueryAsync<ContactPerson>(sql, cancellationToken);
    }

    public async Task<IEnumerable<ContactPerson>> GetContactPersonsByCompanyIdAsync(Guid companyId, CancellationToken cancellationToken)
    {
        const string sql = @"SELECT Id, Name, Email, Telephone, CompanyId FROM ContactPersons WHERE CompanyId = @companyId";

        var args = new
        { 
            companyId

        };
        return await _msSql.QueryAsync<ContactPerson>(sql, args, cancellationToken);

    }

    public async Task<ContactPerson?> GetContactPersonByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        const string sql = @"SELECT Id, Name, Email, Telephone FROM ContactPersons WHERE Id = @id";

        var args = new
        {
          id
        };

        return await _msSql.QuerySingleOrDefaultAsync<ContactPerson>(sql, args, cancellationToken);
    }

    public async Task UpdateContactPersonAsync(Guid id, ContactPerson contactPerson, CancellationToken cancellationToken)
    {
        contactPerson.Id = id;

        const string sql = @"UPDATE ContactPersons
                             SET
                                [Name] = @Name,
                                [Email] = @Email,
                                 [Telephone] = @Telephone
                             WHERE
                                 [Id] = @Id";

        await _msSql.ExecuteAsync(sql, contactPerson, cancellationToken);
    }

    public async Task<int> DeleteContactPersonByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        const string sql = "DELETE FROM ContactPersons WHERE Id = @id";

        var args = new
        {
          id
        };

        return await _msSql.ExecuteAsync(sql, args, cancellationToken);
    }
}