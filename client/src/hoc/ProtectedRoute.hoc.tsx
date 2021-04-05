import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({isAuthenticated, authenticationPath, ...routeProps}: ProtectedRouteProps) => {
  return isAuthenticated ? <Route {...routeProps} /> : <Redirect to={{ pathname: authenticationPath }} />;
};

export default ProtectedRoute;