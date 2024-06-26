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
  ORDER_STATUS,
  TAX_NAME,
  TIME_VALIDITY,
  TRANSACTION_TYPE,
} from '../union.js';

const ExportSchema = z.object({
  dataIncluded: z.object({
    includeDividends: z.boolean(),
    includeInterest: z.boolean(),
    includeOrders: z.boolean(),
    includeTransactions: z.boolean(),
  }),
  downloadLink: z.union([z.string(), z.null()]),
  reportId: z.number(),
  status: EXPORT_STATUS,
  timeFrom: z.string().datetime({offset: true}),
  timeTo: z.string().datetime({offset: true}),
});

export const RequestExportSchema = z.object({
  dataIncluded: z.object({
    includeDividends: z.boolean(),
    includeInterest: z.boolean(),
    includeOrders: z.boolean(),
    includeTransactions: z.boolean(),
  }),
  timeFrom: z.string().datetime({offset: true}),
  timeTo: z.string().datetime({offset: true}),
});

export const RequestExportResponseSchema = z.object({reportId: z.number()});

export const TransactionSchema = z.object({
  amount: z.number(),
  dateTime: z.string().datetime({offset: true}),
  reference: z.string(),
  type: TRANSACTION_TYPE,
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
  status: ORDER_STATUS,
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

/**
 * @see https://t212public-api-docs.redoc.ly/#tag/Historical-items
 */
export class HistoryAPI {
  static readonly URL = {
    DIVIDENDS: '/api/v0/history/dividends',
    EXPORTS: '/api/v0/history/exports',
    ORDERS: '/api/v0/equity/history/orders',
    TRANSACTIONS: '/api/v0/history/transactions',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  private paginate<ItemType extends z.ZodTypeAny>(itemSchema: ItemType, url: string, params?: URLSearchParams) {
    return getPageGenerator(this.apiClient, itemSchema, url, params);
  }

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/orders_1
   */
  getOrderData(ticker?: string) {
    const params = ticker
      ? new URLSearchParams({
          ticker,
        })
      : new URLSearchParams();
    const resource = HistoryAPI.URL.ORDERS;
    return this.paginate(HistoryOrderDataSchema, resource, params);
  }

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/dividends
   */
  getPaidOutDividends(ticker?: string) {
    const params = ticker
      ? new URLSearchParams({
          ticker,
        })
      : new URLSearchParams();
    const resource = HistoryAPI.URL.DIVIDENDS;
    return this.paginate(HistoryDividensSchema, resource, params);
  }

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/getReports
   */
  async getExports() {
    const resource = HistoryAPI.URL.EXPORTS;
    const response = await this.apiClient.get(resource);
    return z.array(ExportSchema).parse(response.data);
  }

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/requestReport
   */
  async requestExport(request: z.infer<typeof RequestExportSchema>) {
    const resource = HistoryAPI.URL.EXPORTS;
    const validated = RequestExportSchema.parse(request);
    const response = await this.apiClient.post(resource, validated);
    return RequestExportResponseSchema.parse(response.data);
  }

  /**
   * Note: This endpoint easily runs into states of 'InternalError'
   * Example: 'https://live.trading212.com/api/v0/history/transactions?limit=50&cursor=c3e50994-7d6f-47c0-b3f9-40f8ba1733f6&time=2024-03-14T22:02:28.805Z'
   * @see https://t212public-api-docs.redoc.ly/#operation/transactions
   */
  getTransactions() {
    const resource = HistoryAPI.URL.TRANSACTIONS;
    return this.paginate(TransactionSchema, resource);
  }
}
