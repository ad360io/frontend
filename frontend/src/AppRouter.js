import { BrowserRouter as Router,
         Route,
         Link,
         Redirect,
         withRouter } from "react-router-dom";
import React, { Component } from 'react';
import Login from './components/login/Login';
import Auth from './components/auth/Auth';

const AppRouter = () => (
    <Router>
      <div>
        {/* <AuthButton /> */}
        <Route path="/" component={ Login } />
        {/* <PrivateRoute path="/dashboard" component={ Dashboard } />
        <PrivateRoute path="/marketplace" component={ Marketplace } />
        <PrivateRoute path="/create" component={ Create } />
        <PrivateRoute path="/profile" component={ Profile } /> */}
      </div>
    </Router>
  );
  
  
  
  const AuthButton = withRouter(
    ({ history }) =>
      Auth.isAuthenticated ? (
        <p>
          Welcome!{" "}
          <button
            onClick={() => {
              Auth.signout(() => history.push("/"));
            }}
          >
            Sign out
          </button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
  );
  
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        Auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
    
//   class Login extends React.Component {
//     state = {
//       redirectToReferrer: false
//     };
  
//     login = () => {
//       fakeAuth.authenticate(() => {
//         this.setState({ redirectToReferrer: true });
//       });
//     };
  
//     render() {
//       const { from } = this.props.location.state || { from: { pathname: "/" } };
//       const { redirectToReferrer } = this.state;
  
//       if (redirectToReferrer) {
//         return <Redirect to={from} />;
//       }
  
//       return (
//         <div>
//           <p>You must log in to view the page at {from.pathname}</p>
//           <button onClick={this.login}>Log in</button>
//         </div>
//       );
//     }
//  }

  
  export default AppRouter;