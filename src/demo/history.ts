import {initClient} from './initClient.js';

const client = await initClient();

const orders = client.rest.history.getOrderData();
for await (const data of orders) {
  console.info(new Date().toISOString(), data);
}

const dividends = client.rest.history.getPaidOutDividends();
for await (const data of dividends) {
  console.info(new Date().toISOString(), data);
}

const exports = await client.rest.history.getExports();
console.info(new Date().toISOString(), exports);
