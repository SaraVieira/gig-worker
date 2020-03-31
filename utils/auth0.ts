import { initAuth0 } from "@auth0/nextjs-auth0";

if (!process.env.domain || !process.env.clientId || !process.env.cookieSecret) {
  throw new Error(`Environment variables not set. Please make sure you have the following environment variables set:
- domain
- clientId,
- cookieSecret

And try again.`);
}

if (!process.env.clientSecret || process.env.cookieSecret) {
  throw new Error("Auth0 secrets missing");
}

export default initAuth0({
  domain: process.env.domain,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret.split("DELETEME")[1],
  scope: "openid profile",
  redirectUri: "http://localhost:3000/api/callback",
  postLogoutRedirectUri: "http://localhost:3000/",
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: process.env.cookieSecret.split("DELETEME")[1],
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
    // (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
    cookieSameSite: "lax",
    // (Optional) Store the id_token in the session. Defaults to false.
    storeIdToken: false,
    // (Optional) Store the access_token in the session. Defaults to false.
    storeAccessToken: false,
    // (Optional) Store the refresh_token in the session. Defaults to false.
    storeRefreshToken: false,
  },
  oidcClient: {
    // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
    httpTimeout: 2500,
    // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
    clockTolerance: 10000,
  },
});
