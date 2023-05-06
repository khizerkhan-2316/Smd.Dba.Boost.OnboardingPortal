import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Role } from './Enums/roles';
import { LocalStorageKey } from './Enums/localStorageKeys';
import { RoutesPath } from './Enums/routePaths';

import adminRoutes from './routes/admin/AdminRoutes';
// import Layout from './components/common/Layout';
import RequireAuth from './components/common/RequireAuth';
import LoginPage from './components/pages/public/LoginPage';
import ResetPage from './components/pages/public/ResetPage';
import ResetPasswordPage from './components/pages/public/ResetPasswordPage';
import NotFoundPage from './components/pages/public/NotFoundPage';
import { useEffect, useCallback } from 'react';
import { useAuth } from './hooks/useAuth';
import { validateToken } from './services/authenticationService';

import './App.css';

function App() {
  const { SetAuthenticationState, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const authenticate = useCallback(async () => {
    try {
      const token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);

      if (token !== null) {
        const tokenValidationResult = await validateToken(token!);

        if (tokenValidationResult.isValid) {
          SetAuthenticationState();
          navigate(RoutesPath.ADMIN_HOME_PAGE);
        } else {
          localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
        }
      }
    } catch (error) {}
  }, [SetAuthenticationState, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate();
    }
  }, [isAuthenticated, authenticate]);

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
        <>
          {adminRoutes.map(({ path, element }: any) => (
            <Route key={path} path={path} element={element} />
          ))}
        </>
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

      {/*Not found page*/}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
