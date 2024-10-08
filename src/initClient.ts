import 'dotenv-defaults/config.js';
import assert from 'node:assert';
import {APIClient} from './APIClient.js';
import type {Trading212Environment} from './getBaseUrl.js';
import {TRADING212_ENVIRONMENT} from './getBaseUrl.js';

export async function initClient(): Promise<APIClient> {
  const apiKey = process.env.TRADING212_API_KEY;
  assert.ok(apiKey);
  const environment = process.env.TRADING212_ENV as Trading212Environment;
  assert.ok(environment);
  if (Object.values(TRADING212_ENVIRONMENT).includes(environment)) {
    return new APIClient(environment, apiKey);
  }
  throw new Error(`Unknown environment "${environment}".`);
}
