import {z} from 'zod';

export const DEVICE = z.union([
  z.literal('ANDROID'),
  z.literal('API'),
  z.literal('AUTOINVEST'),
  z.literal('IOS'),
  z.literal('SYSTEM'),
  z.literal('WEB'),
]);

export const DIVIDEND_TYPE = z.literal('DIVIDEND');

export const INSTRUMENT_TYPE = z.union([
  z.literal('CORPACT'),
  z.literal('CRYPTO'),
  z.literal('CRYPTOCURRENCY'),
  z.literal('CVR'),
  z.literal('ETF'),
  z.literal('FOREX'),
  z.literal('FUTURES'),
  z.literal('INDEX'),
  z.literal('STOCK'),
  z.literal('WARRANT'),
]);

export const ORDER_TYPE = z.union([
  z.literal('MARKET'),
  z.literal('LIMIT'),
  z.literal('STOP'),
  z.literal('STOP_LIMIT'),
]);

export const STATUS = z.union([
  z.literal('CANCELLED'),
  z.literal('CANCELLING'),
  z.literal('CONFIRMED'),
  z.literal('FILLED'),
  z.literal('LOCAL'),
  z.literal('NEW'),
  z.literal('PARTIALLY_FILLED'),
  z.literal('REJECTED'),
  z.literal('REPLACED'),
  z.literal('REPLACING'),
  z.literal('UNCONFIRMED'),
]);

export const TAX_NAME = z.union([
  z.literal('COMMISSION_TURNOVER'),
  z.literal('CURRENCY_CONVERSION_FEE'),
  z.literal('FINRA_FEE'),
  z.literal('FRENCH_TRANSACTION_TAX'),
  z.literal('PTM_LEVY'),
  z.literal('STAMP_DUTY_RESERVE_TAX'),
  z.literal('STAMP_DUTY'),
  z.literal('TRANSACTION_FEE'),
]);

export const TIME_VALIDITY = z.union([z.union([z.literal('DAY'), z.literal('GTC')]), z.null()]);
