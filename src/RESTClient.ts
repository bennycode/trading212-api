import axios, {
  AxiosDefaults,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
  isAxiosError,
} from 'axios';
import axiosRetry from 'axios-retry';
import {AccountAPI} from './equity/account/AccountAPI.js';

/**
 * This class configures the HTTP Library (axios) so it uses the proper URL and reconnection states.
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
      retryDelay: retryCount => {
        // Linear retry
        return retryCount * 1_000;
      },
    });

    // Setup resources
    this.account = new AccountAPI(this.httpClient);
  }
}