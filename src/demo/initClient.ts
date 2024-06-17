import 'dotenv-defaults/config.js';
import {APIClient} from '../APIClient.js';
import assert from 'node:assert';

export async function initClient(): Promise<APIClient> {
  const apiKey = process.env.TRADING212_API_KEY;
  const useLive = process.env.USE_LIVE === 'true';
  const baseUrl = useLive ? APIClient.URL_LIVE : APIClient.URL_DEMO;
  assert.ok(apiKey);
  const client = new APIClient(baseUrl, apiKey);
  return client;
}
