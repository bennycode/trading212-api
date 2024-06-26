import {initClient} from './initClient.js';

const client = await initClient();

const pies = await client.rest.pie.getPie();
console.info(new Date().toISOString(), pies);
