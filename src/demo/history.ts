import {initClient} from './initClient.js';

const client = await initClient();

const orders = client.rest.history.getOrderData('AAPL_US_EQ');
for await (const data of orders) {
  console.info(new Date().toISOString(), data);
}

const dividends = client.rest.history.getPaidOutDividends('AAPL_US_EQ');
for await (const data of dividends) {
  console.info(new Date().toISOString(), data);
}
