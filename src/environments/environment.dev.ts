import { AuthConfig } from '@auth0/auth0-angular';
import { helpers } from '../helpers';

const apiUrl = 'https://api-dev.pmvite.com/api/v1';
const appInfoUrl = 'assets/app-info.json';

const authConfig: AuthConfig = {
  domain: 'pmvite.us.auth0.com',
  clientId: '4McxAA3k5z1jcwzV3Psx1W7XyOnyBrmZ',
  redirectUri: window.location.origin + helpers.getBaseHref(),
  audience: 'https://pmvite.com/hamidev-nodejs-8326-src/',
  httpInterceptor: {
    allowedList: [`${apiUrl}/*`]
  }
};

export const environment = {
  production: true,
  authConfig,
  apiUrl,
  appInfoUrl,
  baseUrl: 'https://dev.hamidbehnam.com/pm'
};
