import 'dotenv-defaults/config.js';
import {Cookie} from 'playwright';
import assert from 'node:assert';
import {getAuth} from './e2e/getAuth.js';
import {getdUUID} from './e2e/getdUUID.js';
import {getLoginToken} from './e2e/getLoginToken.js';
import axios, {isAxiosError} from 'axios';
import {getUserAgent} from './e2e/getUserAgent.js';
import {toCookieString} from './e2e/toCookieString.js';

const auth = await getAuth(`${process.env.TRADING212_EMAIL}`, `${process.env.TRADING212_PASSWORD}`);
const cookies: Cookie[] = JSON.parse(auth.cookieString);
const cookieString = toCookieString(cookies);
console.log(!!cookieString);
const duuid = getdUUID(cookies);
const loginToken = getLoginToken(cookies);
assert.ok(duuid);
assert.ok(loginToken);

// @see https://github.com/HAKSOAT/tradingTOT/blob/844e7d264fbf5e78adb6a80f3ea8548e5b28fae3/src/tradingTOT/endpoints.py
// const AUTHENTICATE_URL = 'https://live.trading212.com/rest/v1/webclient/authenticate';

// try {
//   const authentication = await axios.get(AUTHENTICATE_URL, {
//     headers: {
//       ...auth.headers,
//       Cookie: auth.cookieString,
//     },
//   });
//   console.log('response', authentication.status);
// } catch (error) {
//   if (isAxiosError(error)) {
//     console.log(error.response?.data);
//   } else {
//     throw error;
//   }
// }

const ACCOUNT_SUMMARY_URL = 'https://live.trading212.com/rest/trading/v1/accounts/summary';

try {
  const accountSummary = await axios.post(ACCOUNT_SUMMARY_URL, {}, {
    headers: {
      'User-Agent': getUserAgent(),
      'X-Trader-Client': `application=WC4, version=1.0.0, dUUID=${duuid}`,
      'Content-Type': 'application/json',
      Cookie: cookieString,
      // Cookie: `LOGIN_TOKEN=${loginToken}`,
    },
  });
  console.log('response', accountSummary);
} catch (error) {
  if (isAxiosError(error)) {
    console.log(error);
    console.log('error', error.response ? error.response.data : error);
  } else {
    throw error;
  }
}
