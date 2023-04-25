using System.Data;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

public interface IMsSql
{
    Task<int> ExecuteAsync(string sql, object param, CancellationToken cancellationToken,
        IDbTransaction? dbTransaction = null);

    Task<int> ExecuteAsync(string sql, CancellationToken token, IDbTransaction? dbTransaction = null);

    Task<IEnumerable<T>> QueryAsync<T>(string sql, object param, CancellationToken cancellationToken,
        IDbTransaction? dbTransaction = null);

    Task<IEnumerable<T>> QueryAsync<T>(string sql, CancellationToken cancellationToken,
        IDbTransaction? dbTransaction = null);

    Task<T> QuerySingleOrDefaultAsync<T>(string sql, object param, CancellationToken cancellationToken,
        IDbTransaction? dbTransaction = null);

    string GetConnectionStringKey();
}