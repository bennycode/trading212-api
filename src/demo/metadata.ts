import {initClient} from './initClient.js';

const client = await initClient();
const exchanges = await client.rest.metadata.getInstruments();
console.info(new Date().toISOString(), exchanges);
