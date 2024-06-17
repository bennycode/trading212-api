import {RESTClient} from './RESTClient.js';

/**
 * This class holds all kinds of API connections (REST, WebSocket, etc.)
 */
export class APIClient {
  readonly rest: RESTClient;

  static URL_DEMO = 'https://demo.trading212.com/api/v0/equity/';
  static URL_LIVE = 'https://live.trading212.com/api/v0/equity/';

  constructor(
    private readonly baseUrl: string,
    apiKey: string
  ) {
    this.rest = new RESTClient(baseUrl, apiKey);
  }

  get isLive(): boolean {
    return this.baseUrl === APIClient.URL_LIVE;
  }
}