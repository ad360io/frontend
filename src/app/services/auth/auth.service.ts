// The MIT License (MIT)
// Based on code Copyright (c) 2017 Auth0 Samples

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';
import { Auth0Config } from './auth0-config';
import 'rxjs/add/operator/filter';

@Injectable()
export class AuthService {

  lock = new Auth0Lock(Auth0Config.clientID, Auth0Config.domain,
    {
      oidcConformant: true,
      autoclose: true,
      auth: {
        redirectUrl: Auth0Config.callbackURL,
        responseType: 'token id_token',
        audience: `https://${Auth0Config.domain}/userinfo`,
        params: {
          scope: 'openid profile email'
        }
      },
      theme: {
        logo: Auth0Config.logoURL,
        primaryColor: '#3379b7'
      },
      mustAcceptTerms: true,
      closable: false,
      allowForgotPassword: false,
      languageDictionary: {
        emailInputPlaceholder: 'email',
        passwordInputPlaceholder: 'password',

        signUpTerms: 'I agree to the Qchain Platform <a href="https://drive.google.com/file/d/0B4Cq_DoEduQdcXZzX05vdVN0MkU/view" target="_blank">Terms of Service</a> and <a href="https://drive.google.com/file/d/0B4Cq_DoEduQdNC1SMGItdmRhUkk/view" target="_blank">Privacy Policy</a>.'
      },
      additionalSignUpFields: [
        {name: "name",
         placeholder: "name"}
      ]
    }
  );

  constructor(public router: Router) {}

  // Call in auth-callback ts for path-based routing
  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/dashboard']);
      }
    });

    this.lock.on('authorization_error', (err) => {
      this.router.navigate(['/']);
      console.log(err);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      throw new Error('No valid access token.');
    }

    this.lock.getUserInfo(accessToken, (err, profile) => {
      if (err) {
        console.log(err);
        return;
      }

      cb(err, profile)
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
