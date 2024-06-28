import 'dotenv-defaults/config.js';
import {chromium} from 'playwright';

const browser = await chromium.launch({headless: false});
const page = await browser.newPage();
const baseUrl = 'https://app.trading212.com/';
await page.goto(baseUrl, {waitUntil: 'networkidle'});

const emailSelector = '//input[@type="email"]';
await page.waitForSelector(emailSelector);
await page.fill(emailSelector, `${process.env.TRADING212_EMAIL}`);

const passwordSelector = '//input[@type="password"]';
await page.waitForSelector(passwordSelector);
await page.fill(passwordSelector, `${process.env.TRADING212_PASSWORD}`);

const submitButtonXPath = '//div[text()="Log in"]';
await page.waitForSelector(submitButtonXPath);
await page.click(submitButtonXPath);

const globalMarketsSelector = '[data-testid="Global markets"]';
await page.waitForSelector(globalMarketsSelector);

await page.screenshot({path: 'example.png'});
await browser.close();
