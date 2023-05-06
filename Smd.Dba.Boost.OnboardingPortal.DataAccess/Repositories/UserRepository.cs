using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMsSql _msSql;

    public UserRepository(IMsSql msSql)
    {
        _msSql = msSql;
    }

    public async Task CreateUserAsync(User user, CancellationToken token)
    {
        const string sql = @"INSERT INTO [dbo].[Users] (Id, Username, Email, Password, RoleId, CompanyId ) VALUES (@Id, @Username, @Email, @Password, @RoleId, @CompanyId)";
        await _msSql.ExecuteAsync(sql, user, token);

    }


   

    public async Task<IEnumerable<User>> GetUsers(CancellationToken token)
    {
        const string sql = "SELECT Id, Username, Email, RoleId, CompanyId FROM Users";

        return await _msSql.QueryAsync<User>(sql, token);
    }

    public async Task<User?> GetUserById(Guid id, CancellationToken token)
    {
        const string sql = @"SELECT u.Id, u.Username, u.Email, u.RoleId, u.CompanyId, r.Role
                            
                             FROM Users u 
                             JOIN Roles r ON u.RoleId = r.Id
                             WHERE u.Id = @id";

        var args = new
        {
            id
        };

        return await _msSql.QuerySingleOrDefaultAsync<User>(sql, args, token);
    }

    public async Task<User?> GetUserByEmailAsync(string email, CancellationToken token)
    {
        var sql = @"
        SELECT u.Id, u.Username, u.Email, u.Password, r.Role, u.RoleId, U.CompanyId
        FROM Users u
        JOIN Roles r ON u.RoleId = r.Id
        WHERE u.Email = @Email";

        var args = new
        {
            Email = email
        };

        return await _msSql.QuerySingleOrDefaultAsync<User>(sql, args, token);
    }

    public async Task<bool> IsUserEmailAlreadyTakenAsync(string email, CancellationToken token)
    {
        const string sql = "SELECT COUNT(*) FROM Users WHERE Email = @email";

        var args = new
        {
            email
        };

        var count = await _msSql.ExecuteScalarAsync<int>(sql, args, token);
        return count > 0;
    }

    public async Task<bool> UserExistsAsync(Guid id, CancellationToken token)
    {
        const string sql = "SELECT COUNT(*) FROM Users WHERE Id = @id";

        var args = new
        {
            id
        };

        var count = await _msSql.ExecuteScalarAsync<int>(sql, args, token);

        return count > 0;

    }

    public async Task UpdateUserAsync(Guid id, UserDto user, CancellationToken token)
    {
        const string sql = @"UPDATE Users 
                            SET 
                            Username = @Username, 
                            CompanyName = @CompanyName, 
                            Email = @Email, 
                            RoleId = @RoleId,
                            CompanyId = @CompanyId
                            WHERE 
                                Id = @Id AND 
                                            NOT EXISTS (SELECT 1 FROM Users WHERE Email = @Email AND Id != @Id) AND 
                                            EXISTS (SELECT 1 FROM Roles WHERE Id = @RoleId)
";

        await _msSql.ExecuteAsync(sql, user, token);
    }

    public async Task UpdateUserPasswordByIdAsync(Guid id, string password, CancellationToken cancellationToken)
    {
        const string sql = "UPDATE Users SET password = @Password WHERE Id = @Id";

        var args = new
        {
          Id = id,
          Password = password
        };

        await _msSql.ExecuteAsync(sql, args, cancellationToken);
    }

    public async Task DeleteUserByIdAsync(Guid id, CancellationToken token)
    {
        const string sql = "Delete from Users where Id = @id";
        
        var args = new
        {
          id   
        };

        await _msSql.ExecuteAsync(sql, args, token);
    }
}