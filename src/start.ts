import {initClient} from './initClient.js';

const client = await initClient();

// const auth = await client.experimental.authentication.authenticate();
// console.log(auth.email);

const accountSummary = await client.browser.accounts.getSummary();
console.log(accountSummary.cash.free);
