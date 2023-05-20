using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;

public interface IRobotRepository
{
    public Task InsertRobot(Robot robot, CancellationToken cancellationToken);
}