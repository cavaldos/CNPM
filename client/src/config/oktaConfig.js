export const oktaConfig = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  issuer: `https://${import.meta.env.VITE_OKTA_DOMAIN}/oauth2/default`,
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
};
