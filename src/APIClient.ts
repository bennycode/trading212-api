import {BrowserClient as BrowserClient} from './browser/BrowserClient.js';
import {RESTClient} from './rest/RESTClient.js';
import type {Trading212Environment} from './getBaseUrl.js';
import {TRADING212_ENVIRONMENT} from './getBaseUrl.js';

/**
 * This class holds all kinds of API connections (REST, WebSocket, etc.)
 */
export class APIClient {
  readonly browser: BrowserClient;
  readonly rest: RESTClient;

  static readonly URL_DEMO = 'https://demo.trading212.com';
  static readonly URL_LIVE = 'https://live.trading212.com';

  static readonly URL_SERVICES_DEMO = 'https://demo.services.trading212.com';
  static readonly URL_SERVICES_LIVE = 'https://live.services.trading212.com';

  constructor(
    private readonly environment: Trading212Environment,
    apiKey: string
  ) {
    this.browser = new BrowserClient(environment);
    this.rest = new RESTClient(environment, apiKey);
  }

  get isLive(): boolean {
    return this.environment === TRADING212_ENVIRONMENT.LIVE;
  }
}
