using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

namespace Smd.Dba.Boost.OnboardingPortal.Migration;

public class DatabaseInitializer : IDatabaseInitializer
{
    private readonly IMsSql _msSql;
    private readonly string _dbName;
   
    public DatabaseInitializer(IEnumerable<IMsSql> msSqlList, string connectionStringKey, string dbName)
    {
        _msSql = msSqlList.Single(msSql => msSql.GetConnectionStringKey() == connectionStringKey);
        _dbName = dbName;
    }
    public  async Task InitializeDatabaseIfNotExistsAsync(CancellationToken token)
    {
        
        if (!(await DatabaseExists(token)))
        {
            await InitializeDatabase(token);
        }
        else
        {
            Console.WriteLine("Database is initialized. Skipping initialization ");
        }
    }

    public async Task TearDownDatabaseIfExists(CancellationToken token)
    {
        if (await DatabaseExists(token))
        {
            await DeleteDatabase(token);
        }
    }


    private  async Task<bool> DatabaseExists(CancellationToken token)
    {
         var sql = $"SELECT db_id('{_dbName}')";

        var result = await _msSql.QueryAsync<int?>(sql, cancellationToken: token);
        
        return result.FirstOrDefault() != null;
        
    }

    private  async Task InitializeDatabase(CancellationToken token)
    {
        var sql = $"CREATE DATABASE {_dbName}";
        await _msSql.ExecuteAsync(sql, token);
        
        Console.WriteLine("Database is initialized...");
    }

    private async Task DeleteDatabase(CancellationToken token)
    {
        var sql = $@"
    ALTER DATABASE [{_dbName}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DECLARE @sql NVARCHAR(MAX) = N'';
    SELECT @sql += N'DROP TABLE ' + QUOTENAME(s.name) + N'.' + QUOTENAME(t.name) + N';'
    FROM sys.tables AS t
    INNER JOIN sys.schemas AS s ON t.[schema_id] = s.[schema_id];
    EXEC sp_executesql @sql;
    DROP DATABASE [{_dbName}];";
        
         await _msSql.ExecuteAsync(sql,token);
    }

   
}