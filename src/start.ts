import {initClient} from './initClient.js';

const client = await initClient();

const auth = await client.experimental.getAuthentication();
console.log(auth.email);

const accountSummary = await client.experimental.getAccountSummary();
console.log(accountSummary.cash.free);
