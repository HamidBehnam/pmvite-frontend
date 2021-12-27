// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthConfig } from '@auth0/auth0-angular';
import { helpers } from '../helpers';

const apiUrl = 'http://localhost:8326/api/v1';
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
  production: false,
  authConfig,
  apiUrl,
  appInfoUrl,
  baseUrl: 'http://localhost:4200'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
