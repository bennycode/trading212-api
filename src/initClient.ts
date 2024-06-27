import 'dotenv-defaults/config.js';
import assert from 'node:assert';
import {APIClient} from './APIClient.js';
import {getBaseUrl} from './getBaseUrl.js';

export async function initClient(): Promise<APIClient> {
  const apiKey = process.env.TRADING212_API_KEY;
  assert.ok(apiKey);
  const environment = process.env.TRADING212_ENV;
  if (environment === 'live' || environment === 'demo') {
    const baseUrl = getBaseUrl(environment);
    return new APIClient(baseUrl, apiKey);
  } else {
    throw new Error(`Unknown environment "${environment}".`);
  }
}
