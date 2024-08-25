import {initClient} from '../initClient.js';

const client = await initClient();

const orders = client.rest.history.getOrderData();
for await (const data of orders) {
  console.info(new Date().toISOString(), data);
}

const dividends = client.rest.history.getPaidOutDividends();
for await (const data of dividends) {
  console.info(new Date().toISOString(), data);
}

const exportRequest = await client.rest.history.requestExport({
  dataIncluded: {
    includeDividends: true,
    includeInterest: true,
    includeOrders: true,
    includeTransactions: true,
  },
  timeFrom: '2024-05-01T00:00:00.000Z',
  timeTo: '2024-05-31T23:59:00.000Z',
});
console.info(new Date().toISOString(), exportRequest);

const exports = await client.rest.history.getExports();
console.info(new Date().toISOString(), exports);

const transactions = client.rest.history.getTransactions();
for await (const data of transactions) {
  console.info(new Date().toISOString(), data);
}
