import type {AxiosInstance} from 'axios';
import {z} from 'zod';
import {INSTRUMENT_TYPE} from '../union.js';

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
  addedOn: z.string().datetime({offset: true}),
  currencyCode: z.string(),
  /** International Securities Identification Number, i.e. "MU0527S00004" */
  isin: z.string(),
  maxOpenQuantity: z.number(),
  minTradeQuantity: z.number(),
  name: z.string(),
  shortname: z.union([z.string(), z.undefined()]),
  ticker: z.string(),
  type: INSTRUMENT_TYPE,
  workingScheduleId: z.number(),
});

/**
 * @see https://t212public-api-docs.redoc.ly/#tag/Instruments-Metadata
 */
export class MetadataAPI {
  static readonly URL = {
    EXCHANGES: '/api/v0/equity/metadata/exchanges',
    INSTRUMENTS: '/api/v0/equity/metadata/instruments',
  };

  constructor(private readonly apiClient: AxiosInstance) {}

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/exchanges
   */
  async getExchanges() {
    const resource = MetadataAPI.URL.EXCHANGES;
    const response = await this.apiClient.get(resource);
    return z.array(MetadataExchangeSchema).parse(response.data);
  }

  /**
   * @see https://t212public-api-docs.redoc.ly/#operation/instruments
   */
  async getInstruments() {
    const resource = MetadataAPI.URL.INSTRUMENTS;
    const response = await this.apiClient.get(resource);
    return z.array(MetadataInstrumentSchema).parse(response.data);
  }
}
