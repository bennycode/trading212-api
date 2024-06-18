import {z} from 'zod';
import {AxiosInstance} from 'axios';

const PortfolioOpenPositionSchema = z.object({
  averagePrice: z.number(),
  currentPrice: z.number(),
  frontend: z.union([
    z.literal('ANDROID'),
    z.literal('API'),
    z.literal('AUTOINVEST'),
    z.literal('IOS'),
    z.literal('SYSTEM'),
    z.literal('WEB'),
  ]),
  fxPpl: z.union([z.number(), z.null()]),
  initialFillDate: z.string().datetime({offset: true}),
  maxBuy: z.number(),
  maxSell: z.number(),
  pieQuantity: z.number(),
  ppl: z.number(),
  quantity: z.number(),
  /** The asset, i.e. "AAPL_US_EQ" */
  ticker: z.string(),
});

export type PortfolioOpenPosition = z.infer<typeof PortfolioOpenPositionSchema>;

export class PortfolioAPI {
  static readonly URL = {
    PORTFOLIO: '/portfolio',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  async getOpenPosition(): Promise<PortfolioOpenPosition[]>;
  async getOpenPosition(ticker: string): Promise<PortfolioOpenPosition>;
  async getOpenPosition(ticker?: string) {
    const resource = ticker ? `${PortfolioAPI.URL.PORTFOLIO}/${ticker}` : PortfolioAPI.URL.PORTFOLIO;
    const response = await this.apiClient.get(resource);
    return ticker
      ? PortfolioOpenPositionSchema.parse(response.data)
      : z.array(PortfolioOpenPositionSchema).parse(response.data);
  }
}
