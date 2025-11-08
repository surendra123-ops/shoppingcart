import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader } from '../components/Loader.jsx';
import { useAuth } from '../hooks/useAuth.js';

export const ProtectedRoute = () => {
  const { isAuthenticated, status } = useAuth();
  const location = useLocation();

  if (status === 'loading' || status === 'idle') {
    return <Loader label="Checking session" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

