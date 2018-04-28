import React, { Component } from 'react';
import './Login.css';
import qchain_logo from '../../assets/images/Qchain_logo.png';

class Login extends Component {
    render(){
        return (
            <div class="cover-login">
                <div id="loginCard" class="card-login text-center">
                    <img class="logo" src={ qchain_logo } alt="Qchain" width="230px"/>

                    <br/><br/>

                    <p style={{fontSize: 24+'px'}}>ALPHA <span style={{fontSize: 20+'px'}}>v0.1</span></p>

                    <br/>
                    {/* (click)="show_lock_login()"  */}
                    <a class="btn btn-primary btn-login">LOG IN</a>

                    <span>&nbsp; &nbsp;</span>
                    {/* (click)="show_lock_signup()" */}
                    <a class="btn btn-primary btn-signup">SIGN UP</a>
                </div>
            </div>
        );
    }
}

export default Login;