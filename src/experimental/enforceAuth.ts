import axios from 'axios';
import type {Cookie} from 'playwright';
import type {Trading212Auth} from './getAuth.js';
import {toCookieString} from './toCookieString.js';
import {getUserAgent} from './getUserAgent.js';
import {getdUUID} from './getdUUID.js';

export type Authentication = {
  tradingType: 'EQUITY';
  accountId: number;
  accountSession: string;
  customerSession: string;
  email: string;
  rememberMeCookie: null;
  subSystem: string;
  customerId: string;
  backupCode: null;
  loginToken: null;
  sessionCookieName: 'TRADING212_SESSION_LIVE';
  customerCookieName: 'CUSTOMER_SESSION';
  customer: {
    id: number;
    uuid: string;
    email: string;
    dealer: string;
    lang: string;
    timezone: string;
    registerDate: string;
  };
  account: {
    id: number;
    customerId: number;
    type: string;
    createdDate: string;
    lastSwitchedDate: null;
    tradingType: 'EQUITY';
    status: 'ACTIVE';
    registerSource: string;
    currencyCode: string;
    readyToTrade: boolean;
  };
  serverTimestamp: string;
  sessionValiditySeconds: number;
};

const AUTHENTICATE_URL = 'https://live.trading212.com/rest/v1/webclient/authenticate';

/**
 * @see https://github.com/HAKSOAT/tradingTOT/blob/a5c41f0d6e7fc940598e723e0b6eb4342c3304d5/src/tradingTOT/utils/browser.py#L291C5-L291C17
 */
export async function enforceAuth(auth: Trading212Auth, cookies: Cookie[]) {
  const duuid = getdUUID(cookies);

  const authentication = await axios.get<Authentication>(AUTHENTICATE_URL, {
    headers: {
      ...auth.headers,
      Cookie: toCookieString(cookies),
      'User-Agent': getUserAgent(),
      'X-Trader-Client': `application=WC4, version=1.0.0, dUUID=${duuid}`,
    },
  });

  return authentication.data;
}
