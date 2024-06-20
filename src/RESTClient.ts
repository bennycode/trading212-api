import type {
  AxiosDefaults,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
} from 'axios';
import axios, {isAxiosError} from 'axios';
import axiosRetry from 'axios-retry';
import {AccountAPI} from './equity/account/AccountAPI.js';
import {MetadataAPI} from './equity/metadata/MetadataAPI.js';
import {PortfolioAPI} from './equity/portfolio/PortfolioAPI.js';
import {HistoryAPI} from './equity/history/HistoryAPI.js';

/**
 * This class configures the HTTP Library (axios) so it uses the proper URL and reconnection states. It also exposes all available endpoints.
 */
export class RESTClient {
  get defaults(): AxiosDefaults {
    return this.httpClient.defaults;
  }

  get interceptors(): {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  } {
    return this.httpClient.interceptors;
  }

  // Resources
  readonly account: AccountAPI;
  readonly history: HistoryAPI;
  readonly metadata: MetadataAPI;
  readonly portfolio: PortfolioAPI;

  private readonly httpClient: AxiosInstance;

  constructor(
    readonly baseURL: string,
    private readonly apiKey: string
  ) {
    // Setup Axios
    this.httpClient = axios.create({baseURL});

    this.httpClient.interceptors.request.use(config => {
      config.headers.Authorization = this.apiKey;
      return config;
    });

    axiosRetry(this.httpClient, {
      retries: Infinity,
      retryCondition: (error: AxiosError) => {
        if (isAxiosError(error)) {
          // Handle Airplane mode
          if (error.code === 'EAI_AGAIN') {
            console.log('Airplane mode');
            return true;
          }

          // Handle response errors
          const status = error.response?.status;
          switch (status) {
            case 429:
              // Got rate limited
              return true;
            default:
              return false;
          }
        }
        // Abort retry
        return false;
      },
      retryDelay: (retryCount: number, error: AxiosError) => {
        const url = error.config?.url;
        switch (url) {
          case AccountAPI.URL.CASH:
            return 2_000;
          case PortfolioAPI.URL.PORTFOLIO:
            return 5_000;
          case AccountAPI.URL.INFO:
          case MetadataAPI.URL.EXCHANGES:
            return 30_000;
          case MetadataAPI.URL.INSTRUMENTS:
            return 50_000;
          case HistoryAPI.URL.DIVIDENDS:
          case HistoryAPI.URL.ORDERS:
            return 60_000;
          default:
            return retryCount * 1_000;
        }
      },
    });

    // Setup resources
    this.account = new AccountAPI(this.httpClient);
    this.history = new HistoryAPI(this.httpClient);
    this.metadata = new MetadataAPI(this.httpClient);
    this.portfolio = new PortfolioAPI(this.httpClient);
  }
}
