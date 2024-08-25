export type Authentication = {
  tradingType: 'EQUITY';
  accountId: number;
  accountSession: string;
  customerSession: string;
  email: string;
  rememberMeCookie: null;
  subSystem: string;
  customerId: string;
  backupCode: null;
  loginToken: null;
  sessionCookieName: 'TRADING212_SESSION_LIVE';
  customerCookieName: 'CUSTOMER_SESSION';
  customer: {
    id: number;
    uuid: string;
    email: string;
    dealer: string;
    lang: string;
    timezone: string;
    registerDate: string;
  };
  account: {
    id: number;
    customerId: number;
    type: string;
    createdDate: string;
    lastSwitchedDate: null;
    tradingType: 'EQUITY';
    status: 'ACTIVE';
    registerSource: string;
    currencyCode: string;
    readyToTrade: boolean;
  };
  serverTimestamp: string;
  sessionValiditySeconds: number;
};
