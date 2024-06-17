import type {AxiosInstance} from 'axios';
import {z} from 'zod';

const MetadataExchangeSchema = z.object({
  id: z.number(),
  name: z.string(),
  workingSchedules: z.array(
    z.object({
      id: z.number(),
      timeEvents: z.array(z.object({date: z.string(), type: z.string()})),
    })
  ),
});

const MetadataInstrumentSchema = z.object({
  addedOn: z.string(),
  currencyCode: z.string(),
  isin: z.string(),
  maxOpenQuantity: z.number(),
  minTradeQuantity: z.number(),
  name: z.string(),
  shortname: z.union([z.string(), z.undefined()]),
  ticker: z.string(),
  type: z.string(),
  workingScheduleId: z.number(),
});

export class MetadataAPI {
  static readonly URL = {
    EXCHANGES: '/metadata/exchanges',
    INSTRUMENTS: '/metadata/instruments',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  async getExchanges() {
    const resource = MetadataAPI.URL.EXCHANGES;
    const response = await this.apiClient.get(resource);
    return z.array(MetadataExchangeSchema).parse(response.data);
  }

  async getInstruments() {
    const resource = MetadataAPI.URL.INSTRUMENTS;
    const response = await this.apiClient.get(resource);
    return z.array(MetadataInstrumentSchema).parse(response.data);
  }
}
