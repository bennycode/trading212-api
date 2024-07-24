import axios from 'axios';
import type {Cookie} from 'playwright';
import {getUserAgent} from './getUserAgent.js';
import {toCookieString} from './toCookieString.js';
import {getdUUID} from './getdUUID.js';

const ACCOUNT_SUMMARY_URL = 'https://live.trading212.com/rest/trading/v1/accounts/summary';

export function getAccountSummary(cookies: Cookie[]) {
  const duuid = getdUUID(cookies);

  return axios.post(
    ACCOUNT_SUMMARY_URL,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Cookie: toCookieString(cookies),
        'User-Agent': getUserAgent(),
        'X-Trader-Client': `application=WC4, version=1.0.0, dUUID=${duuid}`,
      },
    }
  );
}
