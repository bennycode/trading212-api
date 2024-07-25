import {APIClient} from './APIClient.js';

export const TRADING212_ENVIRONMENT = {
  LIVE: 'live',
  DEMO: 'demo',
  TEST: 'test',
} as const;

export type Trading212Environment = (typeof TRADING212_ENVIRONMENT)[keyof typeof TRADING212_ENVIRONMENT];

export function getBaseUrl(env: Trading212Environment) {
  switch (env) {
    case TRADING212_ENVIRONMENT.LIVE:
      return APIClient.URL_LIVE;
    case TRADING212_ENVIRONMENT.DEMO:
      return APIClient.URL_DEMO;
    case TRADING212_ENVIRONMENT.TEST:
      return 'https://localhost';
  }
}

export function getBaseServicesUrl(env: Trading212Environment) {
  switch (env) {
    case TRADING212_ENVIRONMENT.LIVE:
      return APIClient.URL_SERVICES_LIVE;
    case TRADING212_ENVIRONMENT.DEMO:
      return APIClient.URL_SERVICES_DEMO;
    case TRADING212_ENVIRONMENT.TEST:
      return 'https://localhost';
  }
}
