import type {AxiosError, AxiosInstance} from 'axios';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import type {Cookie} from 'playwright';
import {AccountsAPI} from '../api/v1/accounts/AccountsAPI.js';
import {AuthenticateAPI} from '../api/v1/webclient/AuthenticateAPI.js';
import type {Trading212Environment} from '../getBaseUrl.js';
import {getBaseServicesUrl} from '../getBaseUrl.js';
import type {Trading212Auth} from './getAuth.js';
import {getAuth} from './getAuth.js';

export class ExperimentalClient {
  // Resources
  readonly accounts: AccountsAPI;
  readonly authentication: AuthenticateAPI;

  private auth?: Trading212Auth;
  private readonly httpClient: AxiosInstance;

  constructor(readonly environment: Trading212Environment) {
    // Setup Axios
    this.httpClient = axios.create({baseURL: getBaseServicesUrl(environment)});

    axiosRetry(this.httpClient, {
      retries: 1,
      retryCondition: async (error: AxiosError) => {
        const code = error.code;

        switch (code) {
          case 'ERR_BAD_REQUEST':
            // await this.relogin();
            return true;
        }

        // Abort retry
        return false;
      },
    });

    // Resources
    this.accounts = new AccountsAPI(this.httpClient);
    this.authentication = new AuthenticateAPI(this.httpClient);
  }

  async relogin() {
    this.auth = undefined;
    return this.login(true);
  }

  private async login(enforceRelogin: boolean) {
    if (this.auth) {
      return this.auth;
    }
    return getAuth(`${process.env.TRADING212_EMAIL}`, `${process.env.TRADING212_PASSWORD}`, enforceRelogin);
  }

  async getAuthentication() {
    // TODO: Put the 2 lines below into a decorator!
    const auth = await this.login(false);
    const cookies: Cookie[] = JSON.parse(auth.cookieString);
    return this.authentication.authenticate(auth, cookies);
  }

  async getAccountSummary() {
    // TODO: Put the 2 lines below into a decorator!
    const auth = await this.login(false);
    const cookies: Cookie[] = JSON.parse(auth.cookieString);
    return this.accounts.getSummary(auth, cookies);
  }
}
