import {z} from 'zod';

export const DEVICE = z.union([
  z.literal('ANDROID'),
  z.literal('API'),
  z.literal('AUTOINVEST'),
  z.literal('IOS'),
  z.literal('SYSTEM'),
  z.literal('WEB'),
]);

export const DIVIDEND_TYPE = z.union([
  z.literal('BONUS_MANUFACTURED_PAYMENT'),
  z.literal('BONUS'),
  z.literal('CAPITAL_GAINS_DISTRIBUTION_MANUFACTURED_PAYMENT'),
  z.literal('CAPITAL_GAINS_DISTRIBUTION_NON_US_MANUFACTURED_PAYMENT'),
  z.literal('CAPITAL_GAINS_DISTRIBUTION_NON_US'),
  z.literal('CAPITAL_GAINS_DISTRIBUTION'),
  z.literal('CAPITAL_GAINS_MANUFACTURED_PAYMENT'),
  z.literal('CAPITAL_GAINS'),
  z.literal('DEMERGER_MANUFACTURED_PAYMENT'),
  z.literal('DEMERGER'),
  z.literal('DIVIDEND'),
  z.literal('DIVIDENDS_PAID_BY_FOREIGN_CORPORATIONS_MANUFACTURED_PAYMENT'),
  z.literal('DIVIDENDS_PAID_BY_FOREIGN_CORPORATIONS'),
  z.literal('DIVIDENDS_PAID_BY_US_CORPORATIONS_MANUFACTURED_PAYMENT'),
  z.literal('DIVIDENDS_PAID_BY_US_CORPORATIONS'),
  z.literal('INTEREST_MANUFACTURED_PAYMENT'),
  z.literal('INTEREST_PAID_BY_FOREIGN_CORPORATIONS_MANUFACTURED_PAYMENT'),
  z.literal('INTEREST_PAID_BY_FOREIGN_CORPORATIONS'),
  z.literal('INTEREST_PAID_BY_US_OBLIGORS_MANUFACTURED_PAYMENT'),
  z.literal('INTEREST_PAID_BY_US_OBLIGORS'),
  z.literal('INTEREST'),
  z.literal('INTERIM_LIQUIDATION_MANUFACTURED_PAYMENT'),
  z.literal('INTERIM_LIQUIDATION'),
  z.literal('MULTIPLE_1042S_TAX_COMPONENTS_MANUFACTURED_PAYMENT'),
  z.literal('MULTIPLE_1042S_TAX_COMPONENTS'),
  z.literal('ORDINARY_MANUFACTURED_PAYMENT'),
  z.literal('ORDINARY'),
  z.literal('OTHER_DIVIDEND_EQUIVALENT_MANUFACTURED_PAYMENT'),
  z.literal('OTHER_DIVIDEND_EQUIVALENT'),
  z.literal('OTHER_INCOME_MANUFACTURED_PAYMENT'),
  z.literal('OTHER_INCOME'),
  z.literal('PROPERTY_INCOME_MANUFACTURED_PAYMENT'),
  z.literal('PROPERTY_INCOME'),
  z.literal('PTP_UNCHARACTERISED_INCOME_MANUFACTURED_PAYMENT'),
  z.literal('PTP_UNCHARACTERISED_INCOME'),
  z.literal('PUBLICLY_TRADED_PARTNERSHIP_DISTRIBUTION_MANUFACTURED_PAYMENT'),
  z.literal('PUBLICLY_TRADED_PARTNERSHIP_DISTRIBUTION'),
  z.literal('QUALIFIED_INVESTMENT_ENTITY_MANUFACTURED_PAYMENT'),
  z.literal('QUALIFIED_INVESTMENT_ENTITY'),
  z.literal('REAL_PROPERTY_INCOME_AND_NATURAL_RESOURCES_ROYALTIES_MANUFACTURED_PAYMENT'),
  z.literal('REAL_PROPERTY_INCOME_AND_NATURAL_RESOURCES_ROYALTIES'),
  z.literal('RETURN_OF_CAPITAL_MANUFACTURED_PAYMENT'),
  z.literal('RETURN_OF_CAPITAL_NON_US_MANUFACTURED_PAYMENT'),
  z.literal('RETURN_OF_CAPITAL_NON_US'),
  z.literal('RETURN_OF_CAPITAL'),
  z.literal('TAX_EVENT_1446F_FOR_PUBLICLY_TRADED_SECURITIES_MANUFACTURED_PAYMENT'),
  z.literal('TAX_EVENT_1446F_FOR_PUBLICLY_TRADED_SECURITIES'),
  z.literal('TRUST_DISTRIBUTION_MANUFACTURED_PAYMENT'),
  z.literal('TRUST_DISTRIBUTION'),
]);

export const EXPORT_STATUS = z.union([
  z.literal('Canceled'),
  z.literal('Failed'),
  z.literal('Finished'),
  z.literal('Processing'),
  z.literal('Queued'),
  z.literal('Running'),
]);

export const FILL_TYPE = z.union([z.literal('TOTV'), z.literal('OTC')]);

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

export const ORDER_STATUS = z.union([
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

export const ORDER_STRATEGY = z.union([z.literal('QUANTITY'), z.literal('VALUE')]);

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

export const TIME_VALIDITY = z.union([z.literal('DAY'), z.literal('GTC')]);

export const TRANSACTION_TYPE = z.union([
  z.literal('DEPOSIT'),
  z.literal('FEE'),
  z.literal('TRANSFER'),
  z.literal('WITHDRAW'),
]);
