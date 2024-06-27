import {chromium} from 'playwright';

const browser = await chromium.launch({headless: false});
const page = await browser.newPage();
const baseUrl = 'https://app.trading212.com/';
await page.goto(baseUrl, {waitUntil: 'networkidle'});
const emailXPath = '//input[@type="email"]';
const passwordXPath = '//input[@type="password"]';
const submitButtonXPath = '//div[text()="Log in"]';
await page.waitForSelector(emailXPath);
await page.fill(emailXPath, 'example@example.com');
await page.waitForSelector(passwordXPath);
await page.fill(passwordXPath, '123456');
await page.waitForSelector(submitButtonXPath);
await page.click(submitButtonXPath);
await page.screenshot({path: 'example.png'});
await browser.close();
