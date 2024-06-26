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
import {AccountAPI} from './api/account/AccountAPI.js';
import {MetadataAPI} from './api/metadata/MetadataAPI.js';
import {PortfolioAPI} from './api/portfolio/PortfolioAPI.js';
import {HistoryAPI} from './api/history/HistoryAPI.js';
import {OrderAPI} from './api/order/OrderAPI.js';
import {PieAPI} from './api/pie/PieAPI.js';

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
  readonly order: OrderAPI;
  readonly pie: PieAPI;
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
        const method = error.config?.method;

        if (method === 'get') {
          // If a particular order ID is fetched we can use a lower timeout
          if (url?.includes(OrderAPI.URL.ORDERS + '/')) {
            return 1_000;
          }

          // If a particular pie ID is fetched we can use a lower timeout
          if (url?.includes(PieAPI.URL.PIES + '/')) {
            return 5_000;
          }
        }

        switch (url) {
          case AccountAPI.URL.CASH:
            return 2_000;
          case OrderAPI.URL.ORDERS:
          case PortfolioAPI.URL.PORTFOLIO:
            return 5_000;
          case AccountAPI.URL.INFO:
          case MetadataAPI.URL.EXCHANGES:
          case PieAPI.URL.PIES:
            return 30_000;
          case MetadataAPI.URL.INSTRUMENTS:
            return 50_000;
          case HistoryAPI.URL.EXPORTS:
            if (method === 'post') {
              return 30_000;
            }
            return 60_000;
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
    this.order = new OrderAPI(this.httpClient);
    this.pie = new PieAPI(this.httpClient);
    this.portfolio = new PortfolioAPI(this.httpClient);
  }
}
