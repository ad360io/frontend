interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  renewalCallbackURL: string;
  logoURL: string;
}

export const Auth0Config: AuthConfig = {
  clientID: 'ip3jdlT8udp8hVobDn5Q2k67eEDvSSIj',
  domain: 'qchain.auth0.com',
  callbackURL: 'http://localhost:4200/auth-callback',
  renewalCallbackURL: 'http://localhost:3001/renew',
  logoURL: 'assets/images/Qchain_logo.png'
};
