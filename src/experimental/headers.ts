import {getdUUID} from './getdUUID.js';
import {getUserAgent} from './getUserAgent.js';
import {toCookieString} from './toCookieString.js';
import type {Trading212Auth} from './getAuth.js';
import type {Cookie} from 'playwright';
import {AxiosRequestHeaders} from 'axios';

export function getHeaders(auth: Trading212Auth, cookies: Cookie[]) {
  const duuid = getdUUID(cookies);

  return {
    ...auth.headers,
    Cookie: toCookieString(cookies),
    'User-Agent': getUserAgent(),
    'X-Trader-Client': `application=WC4,version=7.29.1,dUUID=dUUID=${duuid}`,
    'X-Trader-Device-Mode': 'Chrome',
  };
}

export function addHeaders(headers: AxiosRequestHeaders, additional: Record<string, string>) {
  for (const [key, value] of Object.entries(additional)) {
    headers.set(key, value);
  }
}
