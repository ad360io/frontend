// The MIT License (MIT)
// Based on code Copyright (c) 2017 Auth0 Samples

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth0Config } from './auth0-config';
import Auth0Lock from 'auth0-lock';
import * as auth0 from 'auth0-js';
import 'rxjs/add/operator/filter';

@Injectable()
export class AuthService {
  refreshSubscription: any;

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

  auth0 = new auth0.WebAuth({
    clientID: Auth0Config.clientID,
    domain: Auth0Config.domain
  });

  constructor(public router: Router) {}

  // Call in auth-callback ts for path-based routing
  public handleAuthentication(root_URL: string,
                              router_link_success: string,
                              router_link_failure: string): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);

        history.replaceState(null, null, root_URL + router_link_success);
        this.router.navigate([router_link_success], { skipLocationChange: true });
      }
    });

    this.lock.on('authorization_error', (err) => {
      history.replaceState(null, null, root_URL + router_link_failure);
      this.router.navigate([router_link_failure], { skipLocationChange: true });

      console.log(err);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.scheduleRenewal();
  }

  public renewToken(): void {
    this.auth0.renewAuth({
      audience: `https://${Auth0Config.domain}/userinfo`,
      redirectUri: Auth0Config.renewalCallbackURL,
      usePostMessage: true
    }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal(): void {
    if (!this.isAuthenticated()) {
      return;
    }

    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = Observable.of(expiresAt).flatMap(expiresAt => {
        const now = Date.now();

        // Use the delay in a timer to run the refresh at the proper time
        return Observable.timer(Math.max(1, expiresAt - now));
      });

    // Once delay time is reached, get a new JWT and schedule additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal(): void {
    if (!this.refreshSubscription) {
      return;
    }

    this.refreshSubscription.unsubscribe();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    // Stop scheduling JWT renewals
    this.unscheduleRenewal();

    this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
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

      cb(err, profile);
    });
  }

}
