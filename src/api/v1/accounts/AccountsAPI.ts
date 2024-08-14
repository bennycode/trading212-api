import type {AxiosInstance} from 'axios';
import type {Cookie} from 'playwright';
import type {Trading212Auth} from '../../../experimental/getAuth.js';
import {getHeaders} from '../../../experimental/getHeaders.js';
import {AccountSummary} from './AccountSummary.js';

export class AccountsAPI {
  static readonly URL = {
    SUMMARY_URL: '/rest/trading/v1/accounts/summary',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  async getSummary(auth: Trading212Auth, cookies: Cookie[]) {
    const resource = AccountsAPI.URL.SUMMARY_URL;

    const accountSummary = await this.apiClient.post<AccountSummary>(resource, [], {
      // TODO: Move this to interceptor!
      headers: getHeaders(auth, cookies),
    });

    return accountSummary.data;
  }
}
