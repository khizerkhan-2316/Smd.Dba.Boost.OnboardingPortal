import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function RequireAuth({ allowedRoles }: { allowedRoles: string[] }) {
  const { role } = useAuth();

  const location = useLocation();

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  );
}

export default RequireAuth;
