import axios, { AxiosInstance } from 'axios';
import type { Cookie } from 'playwright';
import { AccountsAPI } from '../api/v1/accounts/AccountsAPI.js';
import { getBaseServicesUrl, Trading212Environment } from '../getBaseUrl.js';
import { enforceAuth } from './enforceAuth.js';
import type { Trading212Auth } from './getAuth.js';
import { getAuth } from './getAuth.js';

export class ExperimentalClient {
  private readonly auth?: Trading212Auth;
  private readonly serviceClient: AxiosInstance;

  // Resources
  readonly accounts: AccountsAPI;

  constructor(readonly environment: Trading212Environment) {
    // Setup Axios
    this.serviceClient = axios.create({baseURL: getBaseServicesUrl(environment)});
    // Resources
    this.accounts = new AccountsAPI(this.serviceClient);
  }

  private async login() {
    if (this.auth) {
      return this.auth;
    }
    return getAuth(`${process.env.TRADING212_EMAIL}`, `${process.env.TRADING212_PASSWORD}`);
  }

  async getAuthentication() {
    const auth = await this.login();
    const cookies: Cookie[] = JSON.parse(auth.cookieString);
    return enforceAuth(auth, cookies);
  }

  // TODO: Avoid such wrappers and use "this.accounts" instead
  async getAccountSummary() {
    const auth = await this.login();
    const cookies: Cookie[] = JSON.parse(auth.cookieString);
    return this.accounts.getAccountSummary(auth, cookies);
  }
}
