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
import AuthCallback   from '../components/auth-callback/AuthCallback';
import Auth           from '../components/auth/Auth';

/*
Transition CSS
*/
import './RouterTransition.css'

const auth = new Auth();  

const handleAuthentication = (nextState, replace, history) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication(history);
  }
}

const pm = new Promise((resolve, reject)=>{
  resolve(handleAuthentication)
})

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
            
            <Route exact path="/" render={(props)=><Login auth={auth} {...props}/>} />
            <PrivateRoute exact path="/dashboard"      component={ Dashboard }     auth={auth} />
            <PrivateRoute exact path="/marketplace"    component={ Marketplace }   auth={auth} />
            <PrivateRoute exact path="/create"         component={ CreateListing } auth={auth} />
            <PrivateRoute exact path="/profile"        component={ Profile }       auth={auth} />
            <Route path="/auth-callback" render={ (props) => {
                handleAuthentication(props,null, props.history);
                return <AuthCallback auth={auth} {...props} /> 
            }}/>
            <DefaultRoute auth={auth}/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )}/>
    
  </BrowserRouter>
);

export default AppRouter;