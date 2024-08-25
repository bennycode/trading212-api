import {initClient} from '../initClient.js';

const client = await initClient();

const positions = await client.rest.portfolio.getOpenPosition();
console.info(new Date().toISOString(), positions);

const position = await client.rest.portfolio.getOpenPosition('AAPL_US_EQ');
console.info(new Date().toISOString(), position);
