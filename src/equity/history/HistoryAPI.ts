import type {AxiosInstance} from 'axios';
import {URLSearchParams} from 'node:url';
import {z} from 'zod';
import {getPageGenerator} from '../../pagination/getPageGenerator.js';
import {
  DEVICE,
  DIVIDEND_TYPE,
  EXPORT_STATUS,
  FILL_TYPE,
  ORDER_TYPE,
  STATUS,
  TAX_NAME,
  TIME_VALIDITY,
} from '../union.js';

const ExportSchema = z.object({
  dataIncluded: z.object({
    includeDividends: z.boolean(),
    includeInterest: z.boolean(),
    includeOrders: z.boolean(),
    includeTransactions: z.boolean(),
  }),
  downloadLink: z.string(),
  reportId: z.number(),
  status: EXPORT_STATUS,
  timeFrom: z.string().datetime({offset: true}),
  timeTo: z.string().datetime({offset: true}),
});

const HistoryDividensSchema = z.object({
  amount: z.number(),
  amountInEuro: z.number(),
  grossAmountPerShare: z.number(),
  paidOn: z.string().datetime({offset: true}),
  quantity: z.number(),
  reference: z.string(),
  ticker: z.string(),
  type: DIVIDEND_TYPE,
});

const HistoryOrderDataSchema = z.object({
  dateCreated: z.string().datetime({offset: true}),
  dateExecuted: z.union([z.string().datetime({offset: true}), z.null()]),
  dateModified: z.string().datetime({offset: true}),
  executor: DEVICE,
  fillCost: z.union([z.number(), z.null()]),
  fillId: z.union([z.number(), z.null()]),
  fillPrice: z.union([z.number(), z.null()]),
  fillResult: z.union([z.number(), z.null()]),
  fillType: z.union([FILL_TYPE, z.null()]),
  filledQuantity: z.union([z.number(), z.null()]),
  filledValue: z.union([z.number(), z.null()]),
  id: z.number(),
  limitPrice: z.union([z.number(), z.null()]),
  orderedQuantity: z.union([z.number(), z.null()]),
  orderedValue: z.union([z.number(), z.null()]),
  parentOrder: z.number(),
  status: STATUS,
  stopPrice: z.union([z.number(), z.null()]),
  taxes: z.array(
    z.object({
      fillId: z.string(),
      name: TAX_NAME,
      quantity: z.number(),
      timeCharged: z.string().datetime({offset: true}),
    })
  ),
  ticker: z.string(),
  timeValidity: z.union([TIME_VALIDITY, z.null()]),
  type: ORDER_TYPE,
});

export class HistoryAPI {
  static readonly URL = {
    DIVIDENDS: '/history/dividends',
    EXPORTS: '/history/exports',
    ORDERS: '/equity/history/orders',
    TRANSACTIONS: '/history/transactions',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  async *getOrderData(ticker?: string) {
    const params = ticker
      ? new URLSearchParams({
          ticker,
        })
      : new URLSearchParams();
    const generator = getPageGenerator(this.apiClient, HistoryAPI.URL.ORDERS, params, HistoryOrderDataSchema);
    for await (const data of generator) {
      yield data;
    }
  }

  async *getPaidOutDividends(ticker?: string) {
    const params = ticker
      ? new URLSearchParams({
          ticker,
        })
      : new URLSearchParams();
    const generator = getPageGenerator(this.apiClient, HistoryAPI.URL.DIVIDENDS, params, HistoryDividensSchema);
    for await (const data of generator) {
      yield data;
    }
  }

  async getExports() {
    const resource = HistoryAPI.URL.EXPORTS;
    const response = await this.apiClient.get(resource);
    return z.array(ExportSchema).parse(response.data);
  }

  async requestExport() {
    const resource = HistoryAPI.URL.EXPORTS;
    const response = await this.apiClient.post(resource, {
      dataIncluded: {
        includeDividends: true,
        includeInterest: true,
        includeOrders: true,
        includeTransactions: true,
      },
      timeFrom: '2019-08-24T14:15:22Z',
      timeTo: '2019-08-24T14:15:22Z',
    });
    return z.array(ExportSchema).parse(response.data);
  }
}
