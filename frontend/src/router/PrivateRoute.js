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
 * Requesting a Private Route will...
 * First check if user is authenticated,
 * if not, send back to Login component
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        Auth.isAuthenticated ? 
        ( <Component {...props} /> ) : ( <Redirect to={{ pathname: "/" }} /> )
    }/>
);

export default PrivateRoute;