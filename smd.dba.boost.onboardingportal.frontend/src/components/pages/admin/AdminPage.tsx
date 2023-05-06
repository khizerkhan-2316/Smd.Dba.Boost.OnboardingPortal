import Link from '../../common/Link';
import { RoutesPath } from '../../../Enums/routePaths';

const AdminPage = () => {
  return (
    <div>
      <h1>ADMIN PAGE!</h1>
      <Link to={RoutesPath.LOGIN_PAGE}>Log ud</Link>
    </div>
  );
};

export default AdminPage;
