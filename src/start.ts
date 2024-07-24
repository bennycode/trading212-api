import {initClient} from './initClient.js';

const client = await initClient();
const auth = await client.experimental.getAuthentication();
console.log(auth.email);
