import axios, {isAxiosError} from 'axios';
import 'dotenv-defaults/config.js';
import {getAuth} from './e2e/getAuth.js';

const auth = await getAuth(`${process.env.TRADING212_EMAIL}`, `${process.env.TRADING212_PASSWORD}`);

// @see https://github.com/HAKSOAT/tradingTOT/blob/844e7d264fbf5e78adb6a80f3ea8548e5b28fae3/src/tradingTOT/endpoints.py
const AUTHENTICATE_URL = 'https://live.trading212.com/rest/v1/webclient/authenticate';
console.log(AUTHENTICATE_URL);
const ACCOUNT_SUMMARY_URL = 'https://live.trading212.com/rest/trading/v1/accounts/summary';

try {
  const response = await axios.post(
    ACCOUNT_SUMMARY_URL,
    {},
    {
      headers: {
        ...auth.headers,
        Cookie: auth.cookieString,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log('response', response);
} catch (error) {
  if (isAxiosError(error)) {
    console.log(error.response?.data);
  } else {
    throw error;
  }
}
