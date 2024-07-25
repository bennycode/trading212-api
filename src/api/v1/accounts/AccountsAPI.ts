import type { AxiosInstance } from 'axios';
import type { Cookie } from 'playwright';
import { Trading212Auth } from '../../../experimental/getAuth.js';
import { getdUUID } from '../../../experimental/getdUUID.js';
import { getUserAgent } from '../../../experimental/getUserAgent.js';
import { toCookieString } from '../../../experimental/toCookieString.js';

export type AccountSummary = {
  cash: {
    free: number;
    total: number;
    interest: number;
    indicator: number;
    commission: number;
    cash: number;
    ppl: number;
    pplExtendedHours: number;
    result: number;
    spreadBack: number;
    nonRefundable: number;
    dividend: number;
    stockInvestment: number;
    freeForStocks: number;
    totalCashForWithdraw: number;
    blockedForStocks: number;
    pieCash: number;
  };
  open: {
    unfilteredCount: number;
    items: Array<{
      positionId: string;
      humanId: string;
      created: string;
      averagePrice: number;
      averagePriceConverted: number;
      currentPrice: number;
      value: number;
      investment: number;
      code: string;
      margin: number;
      ppl: number;
      valueExtendedHours: number;
      quantity: number;
      maxBuy: number;
      maxSell: number;
      maxOpenBuy: number;
      maxOpenSell: number;
      frontend: string;
      autoInvestQuantity: number;
      fxPpl?: number;
      lockedQuantity: number;
      sellableQuantity: number;
    }>;
  };
  orders: {
    unfilteredCount: number;
    items: [];
  };
  valueOrders: {
    unfilteredCount: number;
    items: [];
  };
};

export class AccountsAPI {
  static readonly URL = {
    SUMMARY_URL: '/rest/trading/v1/accounts/summary',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  async getAccountSummary(auth: Trading212Auth, cookies: Cookie[]) {
    const duuid = getdUUID(cookies);

    const accountSummary = await this.apiClient.post<AccountSummary>(AccountsAPI.URL.SUMMARY_URL, [], {
      // TODO: Move this to interceptor!
      headers: {
        ...auth.headers,
        Cookie: toCookieString(cookies),
        'User-Agent': getUserAgent(),
        'X-Trader-Client': `application=WC4, version=1.0.0, dUUID=${duuid}`,
      },
    });

    return accountSummary.data;
  }
}
