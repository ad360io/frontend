/*
Core Libs
*/
import { BrowserRouter, Switch, Route }   from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import React                              from 'react';

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

/*
Transition CSS
*/
import './RouterTransition.css'


/**
 * Main router for the app.
 * Integeration tested:
 *    - Each path display its own component.
 *    - Private Routes can only be accessed after authentication pass.
 *    - Default Routes display expected components base on authentication status.
 */
const AppRouter = () => (
  <BrowserRouter>
    <Route render={({location})=>(
      <TransitionGroup>
        <CSSTransition timeout={300} classNames="fade" key={location.key}>
          <Switch location={location}>
            <Route exact path="/" component={ Login } />
            <PrivateRoute exact path="/dashboard" component={ Dashboard } />
            <PrivateRoute exact path="/marketplace" component={ Marketplace } />
            <PrivateRoute exact path="/create" component={ CreateListing } />
            <PrivateRoute exact path="/profile" component={ Profile } />
            <DefaultRoute />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )}/>
  </BrowserRouter>
);

export default AppRouter;