/*
Core Libs
*/
import { BrowserRouter, Switch, Route }  from "react-router-dom";
import React                             from 'react';

/*
Custom Helpers
*/
import PrivateRoute                      from './PrivateRoute';
import DefaultRoute                      from './DefaultRoute';

/*
Other Major Components
*/
import Login          from '../components/login/Login.component';
import Dashboard      from '../components/dashboard/Dashboard.component';
import Marketplace    from '../components/marketplace/Marketplace.component';
import CreateListing  from '../components/create-listing/CreateListing.component';
import Profile        from '../components/profile/Profile.component';


/**
 * Main router for the app.
 * Integeration tested:
 *    - Each path display its own component.
 *    - Private Routes can only be accessed after authentication pass.
 *    - Default Routes display expected components base on authentication status.
 */
const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={ Login } />
      <PrivateRoute path="/dashboard" component={ Dashboard } />
      <PrivateRoute path="/marketplace" component={ Marketplace } />
      <PrivateRoute path="/create" component={ CreateListing } />
      <PrivateRoute path="/profile" component={ Profile } />
      <DefaultRoute />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;