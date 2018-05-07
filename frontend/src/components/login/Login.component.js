/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS and Logo
*/
import './Login.component.css';
import qchain_logo from '../../assets/images/Qchain_logo.png';

import  Auth  from '../auth/Auth';


/**
 * Login Component
 *     Work to be done:
 *       - migrate Auth0 service
 *       - use Redux to log in
 */
class Login extends Component {
    
    onLoginClickHandler = () => {
        // document.getElementById('loginCard').style.opacity = '0';
        // lock.show();
        
        this.props.auth.login();
    }

    onSignUpClickHandler = () => {
        this.props.auth.signup();
        // document.getElementById('loginCard').style.opacity = '0';
        // lock.show({initialScreen:'signUp'})
    }

    render(){
        // if state.auth is success, redirect to dashboard, else
        return (
            <div className="cover-login">
                <div id="loginCard" className="card-login text-center">
                    <img className="logo" src={ qchain_logo } alt="Qchain" width="230px"/>

                    <br/><br/>

                    <p style={{fontSize: 24+'px'}}>ALPHA <span style={{fontSize: 20+'px'}}>v0.1</span></p>

                    <br/>
                    {/* (click)="show_lock_login()"  */}
                    <a className="btn btn-primary btn-login" id="btn-login" onClick={this.onLoginClickHandler}>LOG IN</a>

                    <span>&nbsp; &nbsp;</span>
                    {/* (click)="show_lock_signup()" */}
                    <a className="btn btn-primary btn-signup" id="btn-signup" onClick={this.onSignUpClickHandler}>SIGN UP</a>
                </div>
            </div>
        );
    }
}

export default Login;