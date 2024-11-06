import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  userRole: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, userRole }) => {
  const { isAuthenticated, userRole: currentRole } = useAuth();
  
  if (!isAuthenticated || currentRole !== userRole) {
    return <Navigate to={`/login/${userRole}`} replace />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;