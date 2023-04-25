using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMsSql _msSql;

    public UserRepository(IMsSql msSql)
    {
        _msSql = msSql;
    }

    public async Task CreateUserAsync(int id, string firstName, string lastname, CancellationToken token)
    {
        const string sql = @"INSERT INTO [User] (Id, FirstName, LastName) VALUES (@Id, @FirstName, @LastName)";

        var args = new
        {
            Id = id,
            FirstName = firstName,
            LastName = lastname
        };

        await _msSql.ExecuteAsync(sql, args, token);

    }


    public async Task<IEnumerable<UserDto>> GetUsers(CancellationToken token)
    {
        const string sql = "SELECT Id, Username, Email FROM Users";

        return await _msSql.QueryAsync<UserDto>(sql, token);
    }

    public async Task<UserDto?> GetUser(Guid id, CancellationToken token)
    {
        const string sql = "SELECT Id, Username, CompanyName, Email, Cvr, RoleId FROM Users WHERE Id = @id";

        var args = new
        {
            id
        };

        return await _msSql.QuerySingleOrDefaultAsync<UserDto>(sql, args, token);
    }
}