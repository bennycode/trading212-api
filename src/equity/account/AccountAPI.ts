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

export class AccountAPI {
  static readonly URL = {
    CASH: '/account/cash',
    INFO: '/account/info',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  async getCash() {
    const resource = AccountAPI.URL.CASH;
    const response = await this.apiClient.get(resource);
    return AccountCashSchema.parse(response.data);
  }

  async getInfo() {
    const resource = AccountAPI.URL.INFO;
    const response = await this.apiClient.get(resource);
    return AccountInfoSchema.parse(response.data);
  }
}
