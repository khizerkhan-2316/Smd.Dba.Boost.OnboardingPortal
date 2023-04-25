using System.Data.SqlClient;
using System.Text.RegularExpressions;
using Dapper;
using Microsoft.Extensions.Configuration;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

namespace Smd.Dba.Boost.OnboardingPortal.Migration;

public class SqlMigration : ISqlMigration
{
    private readonly IMsSql _msSql;
    private const string ScriptsPath = "Scripts";

    public SqlMigration(IEnumerable<IMsSql> msSqlList, string connectionStringKey)
    {
        _msSql = msSqlList.Single(msSql => msSql.GetConnectionStringKey() == connectionStringKey);
        
    }
    
    public async Task MigrateAsync(CancellationToken token)
    {

        if (Directory.Exists((Path.Combine(Environment.CurrentDirectory, ScriptsPath))))
        {
            await ExecuteScriptsAsync(token);
        }
        else
        {
            Console.WriteLine($"Directory with the path {ScriptsPath} dont exist.");
        }
        
        
    }

    public async Task<List<string>> GetUniqueTableNamesFromScripts()
    {
        var tableNames = new List<string>();
        var scriptFiles = Directory.GetFiles("Scripts", "*.sql");

        foreach (var script in scriptFiles)
        {
            var scriptContent = await File.ReadAllTextAsync(script);
            
            var regex = new Regex(@"CREATE\s+TABLE\s+\[?\w+\]?\.?\[?(\w+)\]?",
                RegexOptions.IgnoreCase | RegexOptions.Multiline);
            
            var matches = regex.Matches(scriptContent);
            foreach (Match match in matches)
            {
                var tableName = match.Groups[1].Value;
                if (!tableNames.Contains(tableName))
                {
                    tableNames.Add(tableName);
                }
            }
        }

        return tableNames;
    }


    private async Task ExecuteScriptsAsync(CancellationToken token)
    {
    

        var scriptFiles = Directory.GetFiles("Scripts", "*.sql");
        foreach (var scriptFile in scriptFiles)
        {
            var script = await File.ReadAllTextAsync(scriptFile);
            await _msSql.ExecuteAsync(script, token);
            
            Console.WriteLine($"Executed Script: {scriptFile}");
        }
        
    }
}