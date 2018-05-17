/*
Core Libs
*/
import React                from 'react';
import { Route, Redirect }  from 'react-router-dom';


/**
 * Requesting a Default Route (any Route that doesn't get a match) will...
 * First check if user is authenticated,
 * Send user to dashboard when path has no match
 * or, send back to Login component, if not authenticated.
 */
const DefaultRoute = ({ component: Component, auth: Auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
                const { isAuthenticated } = Auth;
                return isAuthenticated() ? 
                ( authenticatedDefaultComponent(props, Component) ) : 
                ( unauthenticatedDefaultComponent(props,Component) )
            }
        }
    />
);

const unauthenticatedDefaultComponent = (props, Component) => {
  if(props.location.pathname === '/') return <Component {...props} /> 
  else return <Redirect to={{pathname:"/"}} /> 
}

const authenticatedDefaultComponent = (props, Component) => {
  if(props.location.pathname === '/dashboard') return <Component {...props} />
  else return <Redirect to={{pathname:"/dashboard"}} />
}


export default DefaultRoute;