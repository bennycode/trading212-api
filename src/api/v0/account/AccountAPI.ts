import {z} from 'zod';
import type {AxiosInstance} from 'axios';

const AccountCashSchema = z.object({
  blocked: z.union([z.number(), z.null()]),
  free: z.number(),
  invested: z.number(),
  pieCash: z.number(),
  ppl: z.number(),
  result: z.number(),
  total: z.number(),
});

const AccountInfoSchema = z.object({currencyCode: z.string(), id: z.number()});

/**
 * @see https://t212public-api-docs.redoc.ly/#tag/Account-Data
 */
export class AccountAPI {
  static readonly URL = {
    CASH: '/api/v0/equity/account/cash',
    INFO: '/api/v0/equity/account/info',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/accountCash
   */
  async getCash() {
    const resource = AccountAPI.URL.CASH;
    const response = await this.apiClient.get(resource);
    return AccountCashSchema.parse(response.data);
  }

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/account
   */
  async getInfo() {
    const resource = AccountAPI.URL.INFO;
    const response = await this.apiClient.get(resource);
    return AccountInfoSchema.parse(response.data);
  }
}
