import {z} from 'zod';
import type {AxiosInstance} from 'axios';
import {ORDER_STATUS, ORDER_STRATEGY, ORDER_TYPE, TIME_VALIDITY} from '../union.js';

const OrderSchema = z.object({
  creationTime: z.string().datetime({offset: true}),
  filledQuantity: z.number(),
  filledValue: z.number(),
  id: z.number(),
  limitPrice: z.number(),
  quantity: z.number(),
  status: ORDER_STATUS,
  stopPrice: z.number(),
  strategy: ORDER_STRATEGY,
  ticker: z.string(),
  type: ORDER_TYPE,
  value: z.number(),
});

const PlaceLimitOrderSchema = z.object({
  limitPrice: z.number(),
  quantity: z.number(),
  ticker: z.string(),
  timeValidity: TIME_VALIDITY,
});

const PlaceMarketOrderSchema = z.object({
  quantity: z.number(),
  ticker: z.string(),
});

const PlaceStopOrderSchema = z.object({
  quantity: z.number(),
  stopPrice: z.number(),
  ticker: z.string(),
  timeValidity: TIME_VALIDITY,
});

const PlaceStopLimitOrderSchema = z.object({
  limitPrice: z.number(),
  quantity: z.number(),
  stopPrice: z.number(),
  ticker: z.string(),
  timeValidity: TIME_VALIDITY,
});

const LimitOrderSchema = OrderSchema.extend({
  type: z.literal('LIMIT'),
});

const MarketOrderSchema = OrderSchema.extend({
  type: z.literal('MARKET'),
});

const StopOrderSchema = OrderSchema.extend({
  type: z.literal('STOP'),
});

const StopLimitOrderSchema = OrderSchema.extend({
  type: z.literal('STOP_LIMIT'),
});

export type Order = z.infer<typeof OrderSchema>;

/**
 * @see https://t212public-api-docs.redoc.ly/#tag/Equity-Orders
 */
export class OrderAPI {
  static readonly URL = {
    ORDERS: '/api/v0/equity/orders',
    ORDERS_LIMIT: '/api/v0/equity/orders/limit',
    ORDERS_MARKET: '/api/v0/equity/orders/market',
    ORDERS_STOP_LIMIT: '/api/v0/equity/orders/stop_limit',
    ORDERS_STOP: '/api/v0/equity/orders/stop',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/orders
   * @see https://t212public-api-docs.redoc.ly/#operation/orderById
   */
  async getOrder(): Promise<Order[]>;
  async getOrder(id: number): Promise<Order>;
  async getOrder(id?: number) {
    const resource = id ? `${OrderAPI.URL.ORDERS}/${id}` : OrderAPI.URL.ORDERS;
    const response = await this.apiClient.get(resource);
    return id ? OrderSchema.parse(response.data) : z.array(OrderSchema).parse(response.data);
  }

  async cancelOrder(id: number): Promise<void> {
    const resource = `${OrderAPI.URL.ORDERS}/${id}`;
    return this.apiClient.delete(resource);
  }

  async placeLimitOrder(order: z.infer<typeof PlaceLimitOrderSchema>) {
    const resource = OrderAPI.URL.ORDERS_LIMIT;
    const validated = PlaceLimitOrderSchema.parse(order);
    const response = await this.apiClient.post(resource, validated);
    return LimitOrderSchema.parse(response.data);
  }

  async placeMarketOrder(order: z.infer<typeof PlaceMarketOrderSchema>) {
    const resource = OrderAPI.URL.ORDERS_MARKET;
    const validated = PlaceMarketOrderSchema.parse(order);
    const response = await this.apiClient.post(resource, validated);
    return MarketOrderSchema.parse(response.data);
  }

  async placeStopOrder(order: z.infer<typeof PlaceStopOrderSchema>) {
    const resource = OrderAPI.URL.ORDERS_STOP;
    const validated = PlaceStopOrderSchema.parse(order);
    const response = await this.apiClient.post(resource, validated);
    return StopOrderSchema.parse(response.data);
  }

  async placeStopLimitOrder(order: z.infer<typeof PlaceStopLimitOrderSchema>) {
    const resource = OrderAPI.URL.ORDERS_STOP_LIMIT;
    const validated = PlaceStopLimitOrderSchema.parse(order);
    const response = await this.apiClient.post(resource, validated);
    return StopLimitOrderSchema.parse(response.data);
  }
}
