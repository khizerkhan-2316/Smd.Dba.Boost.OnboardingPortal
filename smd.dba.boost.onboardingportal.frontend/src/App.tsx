import { Routes, Route, Navigate } from 'react-router-dom';
import { Role } from './Enums/roles';
import { RoutesPath } from './Enums/routePaths';

import adminRoutes from './routes/admin/AdminRoutes';
import Layout from './components/common/Layout';
import RequireAuth from './components/common/RequireAuth';
import LoginPage from './components/pages/public/LoginPage';
import ResetPage from './components/pages/public/ResetPage';
import ResetPasswordPage from './components/pages/public/ResetPasswordPage';
import NotFoundPage from './components/pages/public/NotFoundPage';
import UnauthorizedPage from './components/pages/common/UnauthorizedPage';

import './App.css';

function App() {
  return (
    <Routes>
      {/*Public Routes*/}

      {/* <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
  </Route> */}

      {/*Proteced Routes user*/}

      <Route element={<RequireAuth allowedRoles={[Role.USER]} />}></Route>

      {/*Protected Routes admin*/}
      <Route element={<RequireAuth allowedRoles={[Role.ADMIN]} />}>
        <Route element={<Layout />}>
          {adminRoutes.map(({ path, element }: any) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>

      <Route path={RoutesPath.LOGIN_PAGE} element={<LoginPage />} />
      <Route path={RoutesPath.RESET_PAGE} element={<ResetPage />} />
      <Route
        path={RoutesPath.RESET_PASSWORD_PAGE}
        element={<ResetPasswordPage />}
      />
      <Route
        path={RoutesPath.USER_HOME_PAGE}
        element={<Navigate to={RoutesPath.LOGIN_PAGE} />}
      />

      <Route
        path={RoutesPath.UNAUTHORIZED_PAGE}
        element={<UnauthorizedPage />}
      />
      {/*Not found page*/}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
