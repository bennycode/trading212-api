import fs from 'fs';
import fse from 'fs-extra/esm';
import {chromium} from 'playwright';
import {getUserAgent} from './getUserAgent.js';

export type Trading212Auth = {
  cookieString: string;
  headers: {
    [key: string]: string;
  };
};

async function login(email: string, password: string): Promise<Trading212Auth> {
  console.log(`Using headless browser: ${process.env.TRADING212_HEADLESS_BROWSER}`);

  let headers: {[key: string]: string} = {};
  const browser = await chromium.launch({headless: process.env.TRADING212_HEADLESS_BROWSER !== 'false'});
  const context = await browser.newContext({
    userAgent: getUserAgent(),
  });
  const page = await context.newPage();
  page.on('request', request => {
    headers = request.headers();
  });

  const LOGIN_URL = 'https://app.trading212.com/';
  await page.goto(LOGIN_URL, {waitUntil: 'networkidle'});

  const emailSelector = '[data-testid="login-form-email-input-base-component"]';
  await page.waitForSelector(emailSelector);
  await page.fill(emailSelector, email);

  const passwordSelector = '[data-testid="login-form-password-input-base-component"]';
  await page.waitForSelector(passwordSelector);
  await page.fill(passwordSelector, password);

  const loginSelector = '[data-testid="login-form-log-in-button"]';
  await page.waitForSelector(loginSelector);
  await page.click(loginSelector);

  const globalMarketsSelector = '[data-testid="Global markets"]';
  await page.waitForSelector(globalMarketsSelector);

  const cookies = await page.context().cookies();
  await browser.close();

  return {
    cookieString: JSON.stringify(cookies),
    headers,
  };
}

/**
 * Attempts to log in using a locally stored cookie. If the cookie is invalid, it will open a browser and re-login.
 *
 * @see https://github.com/HAKSOAT/tradingTOT/blob/844e7d264fbf5e78adb6a80f3ea8548e5b28fae3/src/tradingTOT/utils/browser.py#L270
 */
export async function getAuth(email: string, password: string, enforceRelogin: boolean): Promise<Trading212Auth> {
  const COOKIE_FILE = './credentials/cookie.json';
  const HEADERS_FILE = './credentials/headers.json';

  const hasCookie = fse.pathExistsSync(COOKIE_FILE);
  const hasHeaders = fse.pathExistsSync(HEADERS_FILE);

  const hasAuthFiles = hasCookie && hasHeaders;
  if (hasAuthFiles && !enforceRelogin) {
    console.log('Using auth from files...');
    return {
      cookieString: fs.readFileSync(COOKIE_FILE, 'utf8'),
      headers: fse.readJsonSync(HEADERS_FILE, {encoding: 'utf8'}),
    };
  }
  console.log('No auth files found, logging in via browser...');
  const auth = await login(email, password);
  fse.outputJsonSync(COOKIE_FILE, JSON.parse(auth.cookieString), {encoding: 'utf8'});
  fse.outputJsonSync(HEADERS_FILE, auth.headers, {encoding: 'utf8'});
  return auth;
}
