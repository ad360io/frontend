/*
Core Libs
*/
import React                from 'react';
import { Route, Redirect }  from 'react-router-dom';

/*
Auth Libs
*/
import Auth from '../components/auth/Auth';

/*
Other Components
*/
import Header from '../components/header/Header.component';

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
        ( PrivateContent(props, Component) ) : ( <Redirect to={{ pathname: "/" }} /> )
    }/>
);

const PrivateContent = (props, Component) => (
    <div>
        <Header/>
        <Component {...props} />
    </div>
);


export default PrivateRoute;