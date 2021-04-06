import React from 'react';
import {BrowserRouter, Redirect, Switch} from 'react-router-dom';
import {ProtectedRoute} from 'hoc';
import Main from './Main.routes';
import Public from './Public.routes';
import { isAuth } from 'my-util';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact isAuthenticated={!isAuth()} path="/auth" authenticationPath={"/app"} component={Public} /> 
        <ProtectedRoute isAuthenticated={isAuth()} path="/" authenticationPath={"/auth"} component={Main} /> 
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};