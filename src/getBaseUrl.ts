import {APIClient} from './APIClient.js';

export function getBaseUrl(env: 'live' | 'demo' | 'test') {
  switch (env) {
    case 'live':
      return APIClient.URL_LIVE;
    case 'demo':
      return APIClient.URL_DEMO;
    case 'test':
      return 'https://localhost';
  }
}
