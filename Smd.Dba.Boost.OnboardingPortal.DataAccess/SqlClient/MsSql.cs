using System.Data;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

public class MsSql : IMsSql
{

    private readonly IConfiguration _configuration;
    private readonly string _connectionStringKey;
    
    public MsSql(IConfiguration configuration, string connectionStringKey)
    {
        _configuration = configuration;
        _connectionStringKey = connectionStringKey;
    }

    private async Task<IDbConnection> CreateConnectionAsync(CancellationToken cancellationToken)
    {
        var ckey = _configuration.GetConnectionString(_connectionStringKey)!
            .Replace("%DB_PASSWORD%", Environment.GetEnvironmentVariable("DB_PASSWORD"));
        
        var connection = new SqlConnection(ckey);
        
        await connection.OpenAsync(cancellationToken);
        
        return connection;
    }
    public async Task<int> ExecuteAsync(string sql, object param, CancellationToken cancellationToken, IDbTransaction? dbTransaction = null)
    {
        using IDbConnection connection = await CreateConnectionAsync(cancellationToken);
        {
            var command = new CommandDefinition(sql, param, dbTransaction, cancellationToken: cancellationToken);

            try
            {
                return await connection.ExecuteAsync(command);
            }
            catch (TaskCanceledException)
            {
                return -1;
            }
        }

    }

    public async Task<int> ExecuteAsync(string sql, CancellationToken token, IDbTransaction? dbTransaction = null)
    {
        using IDbConnection connection = await CreateConnectionAsync(token);
        {
            var command = new CommandDefinition(sql, dbTransaction, cancellationToken: token);

            try
            {
                return await connection.ExecuteAsync(command);
            }
            catch (TaskCanceledException)
            {
                return -1;
            }
        }    }

    public async Task<T> ExecuteScalarAsync<T>(string sql, object param, CancellationToken cancellationToken, IDbTransaction? dbTransaction = null)
    {
        using IDbConnection connection = await CreateConnectionAsync(cancellationToken);
        {
            try
            {
                var command = new CommandDefinition(sql, param, dbTransaction, cancellationToken: cancellationToken);

                return await connection.ExecuteScalarAsync<T>(command);
            }
            catch (Exception e)
            {
                throw new Exception("An error occurred while querying the database.", e);

            }
        }
    }

    public async Task<IEnumerable<T>> QueryAsync<T>(string sql, object? param, CancellationToken cancellationToken, IDbTransaction? dbTransaction = null)
    {
        using IDbConnection connection = await CreateConnectionAsync(cancellationToken);
        {
            try
            {
                var command = new CommandDefinition(sql, param, dbTransaction, cancellationToken: cancellationToken);

                return await connection.QueryAsync<T>(command);
            }
            catch (Exception e)
            {
                throw new Exception("An error occurred while querying the database.", e);

            }
        }
        
        
    }

    public async Task<IEnumerable<T>> QueryAsync<T>(string sql, CancellationToken cancellationToken, IDbTransaction? dbTransaction = null)
    {
        using IDbConnection connection = await CreateConnectionAsync(cancellationToken);
        {
            try
            {
                var command = new CommandDefinition(sql, null, dbTransaction, cancellationToken: cancellationToken);

                return await connection.QueryAsync<T>(command);
            }
            catch (Exception e)
            {
                throw new Exception("An error occurred while querying the database.", e);

            }
        }    }

    public async Task<T> QuerySingleOrDefaultAsync<T>(string sql, object param, CancellationToken cancellationToken,
        IDbTransaction? dbTransaction = null)
    {
        using IDbConnection connection = await CreateConnectionAsync(cancellationToken);
        {

            try
            {
                var command = new CommandDefinition(sql, param, dbTransaction, cancellationToken: cancellationToken);

                return await connection.QuerySingleOrDefaultAsync<T>(command);
            }
            catch (Exception e)
            {
                throw new Exception("An error occurred while querying the database.", e);

            }
        }
        
       
    }

    public string GetConnectionStringKey()
    {
        return _connectionStringKey;
    }
}