import { RouteConfig } from '../../types/route-config';
import { RoutesPath } from '../../Enums/routePaths';

import AdminPage from '../../components/pages/admin/AdminPage';

const adminRoutes: RouteConfig[] = [
  {
    path: RoutesPath.ADMIN_HOME_PAGE,
    element: <AdminPage />,
  },
];

export default adminRoutes;
