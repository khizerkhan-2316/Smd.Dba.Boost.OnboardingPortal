import { RouteConfig } from '../../types/route-config';
import { RoutesPath } from '../../Enums/routePaths';

import AdminCompaniesPage from '../../components/pages/admin/AdminCompaniesPage';
import CreateCompanyPage from '../../components/pages/admin/CreateCompanyPage';
import UpdateCompanyPage from '../../components/pages/admin/UpdateCompanyPage';
import CompanyDetailsPage from '../../components/pages/admin/CompanyDetailsPage';
import CreateContactPersonPage from '../../components/pages/admin/CreateContactPersonPage';
import UpdateContactPersonPage from '../../components/pages/admin/UpdateContactPersonPage';
import CreateUserPage from '../../components/pages/admin/CreateUserPage';
import UpdateUserPage from '../../components/pages/admin/UpdateUserPage';
import OnboardingPage from '../../components/pages/admin/OnboardingPage';
import DocumentationPage from '../../components/pages/common/DocumentationPage';
import CreateProductFeedPage from '../../components/pages/admin/CreateProductFeedPage';
import UpdateProductFeedPage from '../../components/pages/admin/UpdateProductFeedPage';
import RobotPage from '../../components/pages/admin/RobotPage';

const adminRoutes: RouteConfig[] = [
  {
    path: RoutesPath.ADMIN_HOME_PAGE,
    element: <AdminCompaniesPage />,
  },

  {
    path: RoutesPath.ADMIN_CREATE_COMPANY_PAGE,
    element: <CreateCompanyPage />,
  },

  {
    path: RoutesPath.ADMIN_UPDATE_COMPANY_PAGE,
    element: <UpdateCompanyPage />,
  },

  {
    path: RoutesPath.ADMIN_COMPANY_DETAILS_PAGE,
    element: <CompanyDetailsPage />,
  },

  {
    path: RoutesPath.ADMIN_CREATE_CONTACT_PERSON_PAGE,
    element: <CreateContactPersonPage />,
  },

  {
    path: RoutesPath.ADMIN_UPDATE_CONTACT_PERSON_PAGE,
    element: <UpdateContactPersonPage />,
  },

  {
    path: RoutesPath.ADMIN_CREATE_USER_PAGE,
    element: <CreateUserPage />,
  },

  {
    path: RoutesPath.ADMIN_UPDATE_USER_PAGE,
    element: <UpdateUserPage />,
  },

  {
    path: RoutesPath.ADMIN_ONBOARDING_PAGE,
    element: <OnboardingPage />,
  },

  {
    path: RoutesPath.ADMIN_DOCUMENTATION_PAGE,
    element: <DocumentationPage />,
  },

  {
    path: RoutesPath.ADMIN_CREATE_PRODUCTFEED_PAGE,
    element: <CreateProductFeedPage />,
  },

  {
    path: RoutesPath.ADMIN_ROBOT_PAGE,
    element: <RobotPage />,
  },

  {
    path: RoutesPath.ADMIN_UPDATE_PRODUCTFEED_PAGE,
    element: <UpdateProductFeedPage />,
  },
];

export default adminRoutes;
