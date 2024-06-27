import {initClient} from '../initClient.js';

const client = await initClient();

const orders = await client.rest.order.getOrder();
console.info(new Date().toISOString(), orders);
