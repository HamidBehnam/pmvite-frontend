import { AuthConfig } from '@auth0/auth0-angular';
import { helpers } from '../helpers';

const apiUrl = 'https://hamidbehnam.com/nodejs/8324/api/v1';
const appInfoUrl = 'assets/app-info.json';

const authConfig: AuthConfig = {
  domain: 'hamidbehnam-project-management-s1.us.auth0.com',
  clientId: 'tx7pdrg3Ioaw9GZWYYV1tCtarAikJ971',
  redirectUri: window.location.origin + helpers.getBaseHref(),
  audience: 'https://hamidbehnam.com/nodejs/8324/',
  httpInterceptor: {
    allowedList: [`${apiUrl}/*`]
  }
};

export const environment = {
  production: true,
  authConfig,
  apiUrl,
  appInfoUrl,
  baseUrl: 'https://hamidbehnam.com/pm'
};
