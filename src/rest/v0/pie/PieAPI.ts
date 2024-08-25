import type {AxiosInstance} from 'axios';
import {z} from 'zod';
import {DIVIDEND_CASH_ACTION, PIE_ICON, PIE_STATUS_GOAL} from '../../unions.js';

const CreatePieSchema = z.object({
  dividendCashAction: DIVIDEND_CASH_ACTION,
  endDate: z.string().datetime({offset: true}),
  goal: z.number(),
  icon: z.string(),
  instrumentShares: z.record(z.number()),
  name: z.string(),
});

const PieSchema = z.object({
  cash: z.number(),
  dividendDetails: z.object({
    gained: z.number(),
    inCash: z.number(),
    reinvested: z.number(),
  }),
  id: z.number(),
  progress: z.number(),
  result: z.object({
    investedValue: z.number(),
    result: z.number(),
    resultCoef: z.number(),
    value: z.number(),
  }),
  status: PIE_STATUS_GOAL,
});

const DetailedPieSchema = z.object({
  instruments: z.array(
    z.object({
      currentShare: z.number(),
      expectedShare: z.number(),
      issues: z.array(z.object({name: z.string(), severity: z.string()})),
      ownedQuantity: z.number(),
      result: z.object({
        investedValue: z.number(),
        result: z.number(),
        resultCoef: z.number(),
        value: z.number(),
      }),
      ticker: z.string(),
    })
  ),
  settings: z.object({
    creationDate: z.string().datetime({offset: true}),
    dividendCashAction: DIVIDEND_CASH_ACTION,
    endDate: z.string().datetime({offset: true}),
    goal: z.number(),
    icon: PIE_ICON,
    id: z.number(),
    initialInvestment: z.number(),
    instrumentShares: z.union([z.null(), z.record(z.number())]),
    name: z.string(),
    publicUrl: z.union([z.string(), z.null()]),
  }),
});

export type Pie = z.infer<typeof PieSchema>;

export type DetailedPie = z.infer<typeof DetailedPieSchema>;

export type CreatePie = z.infer<typeof CreatePieSchema>;

/**
 * @see https://t212public-api-docs.redoc.ly/#tag/Pies
 */
export class PieAPI {
  static readonly URL = {
    PIES: '/api/v0/equity/pies',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/getAll
   * @see https://t212public-api-docs.redoc.ly/#operation/getDetailed
   */
  async getPie(): Promise<Pie[]>;
  async getPie(id: number): Promise<DetailedPie>;
  async getPie(id?: number) {
    const resource = id ? `${PieAPI.URL.PIES}/${id}` : PieAPI.URL.PIES;
    const response = await this.apiClient.get(resource);
    return id ? DetailedPieSchema.parse(response.data) : z.array(PieSchema).parse(response.data);
  }

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/create
   */
  async createPie(request: CreatePie) {
    const resource = PieAPI.URL.PIES;
    const validated = CreatePieSchema.parse(request);
    const response = await this.apiClient.post(resource, validated);
    return DetailedPieSchema.parse(response.data);
  }

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/update
   */
  async updatePie(id: number, request: CreatePie) {
    const resource = `${PieAPI.URL.PIES}/${id}`;
    const validated = CreatePieSchema.parse(request);
    const response = await this.apiClient.post(resource, validated);
    return DetailedPieSchema.parse(response.data);
  }

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/delete
   */
  async deletePie(id: number): Promise<void> {
    const resource = `${PieAPI.URL.PIES}/${id}`;
    return this.apiClient.delete(resource);
  }
}
