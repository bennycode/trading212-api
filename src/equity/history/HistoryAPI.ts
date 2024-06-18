import type {AxiosInstance} from 'axios';
import {URLSearchParams} from 'node:url';
import {z} from 'zod';
import {DEVICE, STATUS, TAX_NAME, TIME_VALIDITY, ORDER_TYPE} from '../union.js';

const HistoryOrderDataSchema = z.object({
  dateCreated: z.string().datetime({offset: true}),
  dateExecuted: z.union([z.string().datetime({offset: true}), z.null()]),
  dateModified: z.string().datetime({offset: true}),
  executor: DEVICE,
  fillCost: z.union([z.number(), z.null()]),
  fillId: z.union([z.number(), z.null()]),
  fillPrice: z.union([z.number(), z.null()]),
  fillResult: z.union([z.number(), z.null()]),
  fillType: z.union([z.string(), z.null()]),
  filledQuantity: z.number(),
  filledValue: z.union([z.number(), z.null()]),
  id: z.number(),
  limitPrice: z.union([z.number(), z.null()]),
  orderedQuantity: z.number(),
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
  timeValidity: TIME_VALIDITY,
  type: ORDER_TYPE,
});

const HistoryOrderDataPageSchema = z.object({
  items: z.array(HistoryOrderDataSchema),
  nextPagePath: z.union([z.string(), z.null()]),
});

export class HistoryAPI {
  static readonly URL = {
    EXPORTS: '/history/exports',
    INSTRUMENTS: '/history/dividends',
    ORDERS: '/history/orders',
    TRANSACTIONS: '/history/transactions',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  async *getOrderData(ticker: string) {
    let cursor: number = 0;
    while (cursor !== -1) {
      // Arrange
      const params = new URLSearchParams({
        cursor: `${cursor}`,
        limit: '50',
        ticker,
      });

      // Act
      const response = await this.apiClient.get(`${HistoryAPI.URL.ORDERS}?${params.toString()}`);
      const validated = HistoryOrderDataPageSchema.parse(response.data);

      for (const item of validated.items) {
        yield item;
      }

      // Update
      if (!validated.nextPagePath) {
        cursor = -1;
      } else {
        cursor += 1;
      }
    }
  }
}
