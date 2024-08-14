import type {AxiosInstance} from 'axios';
import type {Authentication} from './Authentication.js';

export class AuthenticateAPI {
  static readonly URL = {
    // https://live.services.trading212.com/rest/v1/webclient/authenticate
    AUTHENTICATE_URL: '/rest/v1/webclient/authenticate',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  /**
   * Many endpoints are reling on calling "/rest/v1/webclient/authenticate" first. Where such a call is missing, we get errors because lack of authentication.
   *
   * @deprecated This endpoint seems to be currently broken on Trading212.
   * @see https://haksoat.com/reverse-engineering-trading212/#studying-the-apis
   * @see https://github.com/HAKSOAT/tradingTOT/blob/a5c41f0d6e7fc940598e723e0b6eb4342c3304d5/src/tradingTOT/utils/browser.py#L291C5-L291C17
   */
  async authenticate() {
    const resource = AuthenticateAPI.URL.AUTHENTICATE_URL;
    const authentication = await this.apiClient.get<Authentication>(resource);
    return authentication.data;
  }
}
