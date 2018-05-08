/*
Auth0 Libs
*/
import { Auth0Config } from './auth0-config';
import auth0 from 'auth0-js';


export default class Auth {

    constructor(){
        this.login = this.login.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.setSession = this.setSession.bind(this);
        this.logout = this.logout.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.renewToken = this.renewToken.bind(this);
        this.scheduleRenewal = this.scheduleRenewal.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getProfile = this.getProfile.bind(this);

        this.scheduleRenewal();
    }

    tokenRenewalTimeout;
    userProfile;

    auth0 = new auth0.WebAuth({
        domain: `${Auth0Config.domain}`,
        clientID: `${Auth0Config.clientID}`,
        redirectUri: 'http://localhost:4200/auth-callback',
        audience: `https://${Auth0Config.domain}/userinfo`,
        responseType: 'token id_token',
        scope: 'openid profile email'
    });

    login() {
        this.auth0.authorize();
    }

    handleAuthentication(propsHistory) {
        this.auth0.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult, propsHistory);
          } else if (err) {
            propsHistory.push('/');
            console.log(err);
          }
        });
      }
    
    setSession(authResult, propsHistory) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        propsHistory.push('/dashboard');
        this.scheduleRenewal();
    }
    
    logout() {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');

        clearTimeout(this.tokenRenewalTimeout);
    }
    
    isAuthenticated() {
        // Check whether the current time is past the 
        // Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    renewToken() {
        this.auth0.checkSession({}, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              this.setSession(result);
            }
          }
        );
    }

    scheduleRenewal() {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        const delay = expiresAt - Date.now();
        if (delay > 0) {
          this.tokenRenewalTimeout = setTimeout(() => {
            this.renewToken();
          }, delay);
        }
    }

    getAccessToken() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('No Access Token found');
        }
        return accessToken;
    }

    getProfile(cb) {
        let accessToken = this.getAccessToken();
        this.auth0.client.userInfo(accessToken, (err, profile) => {
          if (profile) {
            this.userProfile = profile;
          }
          cb(err, profile);
        });
    }
    
}