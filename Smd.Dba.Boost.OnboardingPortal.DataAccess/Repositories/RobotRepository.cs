using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.SqlClient;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories;

public class RobotRepository : IRobotRepository
{

    private readonly IMsSql _msSql;

    public RobotRepository(IMsSql msSql)
    {
        _msSql = msSql;
    }


    public async Task InsertRobot(Robot robot, CancellationToken cancellationToken)
    {
        
    }
}