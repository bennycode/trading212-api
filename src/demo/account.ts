import {initClient} from './initClient.js';

const client = await initClient();
while (true) {
  const cash = await client.rest.account.getCash();
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.info(new Date().toISOString(), cash);
}
