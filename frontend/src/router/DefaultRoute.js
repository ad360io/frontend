/*
Core Libs
*/
import React                from 'react';
import { Route, Redirect }  from 'react-router-dom';

/*
Auth Libs
*/
import Auth                 from '../components/auth/Auth';


/**
 * Requesting a Default Route will...
 * First check if user is authenticated,
 * Send user to dashboard when path has no match
 * or, send back to Login component, if not authenticated.
 */
const DefaultRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        Auth.isAuthenticated ? 
        ( <Redirect to={{pathname: "/dashboard"}} /> ) : ( <Redirect to={{pathname: "/"}}/> )
      }
    />
);

export default DefaultRoute;