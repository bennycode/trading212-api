import type {AxiosInstance} from 'axios';
import type {Cookie} from 'playwright';
import type {Trading212Auth} from '../../../experimental/getAuth.js';
import {getdUUID} from '../../../experimental/getdUUID.js';
import {getUserAgent} from '../../../experimental/getUserAgent.js';
import {toCookieString} from '../../../experimental/toCookieString.js';
import type {Authentication} from './Authentication.js';

export class AuthenticateAPI {
  static readonly URL = {
    // Info: It's "live.trading212.com" here and not "live.services.trading212.com"!
    AUTHENTICATE_URL: 'https://live.trading212.com/rest/v1/webclient/authenticate',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  /**
   * Many endpoints are reling on calling "/rest/v1/webclient/authenticate" first. Where such a call is missing, we get errors because lack of authentication.
   *
   * @see https://haksoat.com/reverse-engineering-trading212/#studying-the-apis
   * @see https://github.com/HAKSOAT/tradingTOT/blob/a5c41f0d6e7fc940598e723e0b6eb4342c3304d5/src/tradingTOT/utils/browser.py#L291C5-L291C17
   */
  async authenticate(auth: Trading212Auth, cookies: Cookie[]) {
    const duuid = getdUUID(cookies);
    const resource = AuthenticateAPI.URL.AUTHENTICATE_URL;

    const authentication = await this.apiClient.get<Authentication>(resource, {
      baseURL: '',
      headers: {
        ...auth.headers,
        Cookie: toCookieString(cookies),
        'User-Agent': getUserAgent(),
        'X-Trader-Client': `application=WC4, version=1.0.0, dUUID=${duuid}`,
      },
    });

    return authentication.data;
  }
}
