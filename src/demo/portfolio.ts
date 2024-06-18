import {initClient} from './initClient.js';

const client = await initClient();
const positions = await client.rest.portfolio.getOpenPosition();
console.info(new Date().toISOString(), positions);
