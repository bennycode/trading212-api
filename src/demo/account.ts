import {initClient} from './initClient.js';

const client = await initClient();

const cash = await client.rest.account.getCash();
console.info(new Date().toISOString(), cash);

const info = await client.rest.account.getInfo();
console.info(new Date().toISOString(), info);
