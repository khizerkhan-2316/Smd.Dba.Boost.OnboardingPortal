import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LocalStorageKey } from '../../Enums/localStorageKeys';
import { validateToken } from '../../services/authenticationService';

function RequireAuth({ allowedRoles }: { allowedRoles: string[] }) {
  const { role, isAuthenticated, SetAuthenticationState } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const authenticate = useCallback(async () => {
    try {
      const token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);

      if (token !== null) {
        const tokenValidationResult = await validateToken(token!);

        if (tokenValidationResult.isValid) {
          SetAuthenticationState();
        } else {
          localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
          localStorage.removeItem(LocalStorageKey.ROLE);
        }
      }
    } catch (error) {
      localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
      localStorage.removeItem(LocalStorageKey.ROLE);
    }

    setIsLoading(false); // Mark authentication process as complete
  }, [SetAuthenticationState]);

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate();
    } else {
      setIsLoading(false); // Mark authentication process as complete if already authenticated
    }
  }, [isAuthenticated, authenticate]);

  if (isLoading) {
    return <div>Loading...</div>; // Render loading state while authenticating
  }

  const hasAccess = allowedRoles.includes(role);

  if (isAuthenticated && location.pathname === '/login') {
    if (role === 'Admin') {
      return <Navigate to="/admin/companies" replace />;
    } else if (role === 'User') {
      return <Navigate to="/" replace />;
    }
  }

  return isAuthenticated && hasAccess ? (
    <Outlet />
  ) : isAuthenticated ? (
    <Navigate
      to="/unauthorized"
      state={{ from: location.pathname }}
      replace={true}
    />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace={true} />
  );
}

export default RequireAuth;
