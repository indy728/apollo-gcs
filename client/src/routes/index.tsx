import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {ProtectedRoute} from 'hoc';
import Main from './Main.routes';
import Public from './Public.routes';
import { isAuth } from 'my-util';
import Logout from 'pages/Logout';

// const LogoutPage = React.lazy(() =>
//   import('pages/Logout').then((module) => ({
//       default: module.default,
//   }))
// )

export const Routes: React.FC = () => {
  console.log('[client/src/routes/index.tsx] isAuth(): ', isAuth())
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/logout" component={Logout} />
        <ProtectedRoute isAuthenticated={!isAuth()} path="/auth" authenticationPath={"/app"} component={Public} /> 
        <ProtectedRoute isAuthenticated={isAuth()} path="/app" authenticationPath={"/auth"} component={Main} /> 
        <Redirect to={isAuth() ? '/app' : "/auth"} />
      </Switch>
    </BrowserRouter>
  );
};