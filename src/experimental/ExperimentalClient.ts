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
import {addHeaders, getHeaders} from './headers.js';

export class ExperimentalClient {
  // Resources
  readonly accounts: AccountsAPI;
  readonly authentication: AuthenticateAPI;

  private auth?: Trading212Auth;
  private readonly httpClient: AxiosInstance;

  constructor(readonly environment: Trading212Environment) {
    // Setup Axios
    this.httpClient = axios.create({baseURL: getBaseServicesUrl(environment)});

    this.httpClient.interceptors.request.use(async config => {
      const auth = await this.login(false);
      const cookies: Cookie[] = JSON.parse(auth.cookieString);
      addHeaders(config.headers, getHeaders(auth, cookies));
      return config;
    });

    axiosRetry(this.httpClient, {
      retries: Infinity,
      retryCondition: async (error: AxiosError) => {
        console.warn(`Request failed on: ${error.config?.baseURL}${error.config?.url}`);

        const code = error.code;
        const errorData = error.response?.data;

        if (errorData && typeof errorData === 'object' && 'code' in errorData) {
          switch (errorData.code) {
            case 'InternalError':
              return true;
          }
        }

        switch (code) {
          case 'ERR_BAD_REQUEST':
            // TODO: Relogin on authentication failure
            // await this.relogin();
            return false;
        }

        // Abort retry
        return false;
      },
      retryDelay: (retryCount: number) => {
        return retryCount * 1_000;
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
    this.auth = await getAuth(`${process.env.TRADING212_EMAIL}`, `${process.env.TRADING212_PASSWORD}`, enforceRelogin);
    return this.auth;
  }
}
