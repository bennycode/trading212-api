import type {AxiosInstance} from 'axios';
import type {AccountSummary} from './AccountSummary.js';

export class AccountsAPI {
  static readonly URL = {
    SUMMARY_URL: '/rest/trading/v1/accounts/summary',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  /**
   * Note: Sometimes this endpoint throws an "InternalError" due to Trading212 unstable APIs.
   */
  async getSummary() {
    const resource = AccountsAPI.URL.SUMMARY_URL;
    const accountSummary = await this.apiClient.post<AccountSummary>(resource, []);
    return accountSummary.data;
  }
}
