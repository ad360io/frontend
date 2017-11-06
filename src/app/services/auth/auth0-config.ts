interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  logoURL: string;
}

export const Auth0Config: AuthConfig = {
  clientID: 'ip3jdlT8udp8hVobDn5Q2k67eEDvSSIj',
  domain: 'qchain.auth0.com',
  callbackURL: 'http://localhost:4200/auth-callback',
  logoURL: 'https://qchain.co/img/core/Qchain_logo.png'
};
