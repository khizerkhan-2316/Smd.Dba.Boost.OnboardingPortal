import { Typography } from '@mui/material';
import Link from './Link';
import { RoutesPath } from '../../Enums/routePaths';

function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1" align="center" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        Den efterspurgte side blev ikke fundet
      </Typography>
      <Link to={RoutesPath.USER_HOME_PAGE}> Gå tilbage </Link>
    </div>
  );
}

export default NotFound;
