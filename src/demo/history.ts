import {initClient} from './initClient.js';

const client = await initClient();
const generator = client.rest.history.getOrderData('AAPL_US_EQ');
for await (const data of generator) {
  console.info(new Date().toISOString(), data);
}
