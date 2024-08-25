export type AccountSummary = {
  cash: {
    free: number;
    total: number;
    interest: number;
    indicator: number;
    commission: number;
    cash: number;
    ppl: number;
    pplExtendedHours: number;
    result: number;
    spreadBack: number;
    nonRefundable: number;
    dividend: number;
    stockInvestment: number;
    freeForStocks: number;
    totalCashForWithdraw: number;
    blockedForStocks: number;
    pieCash: number;
  };
  open: {
    unfilteredCount: number;
    items: {
      positionId: string;
      humanId: string;
      created: string;
      averagePrice: number;
      averagePriceConverted: number;
      currentPrice: number;
      value: number;
      investment: number;
      code: string;
      margin: number;
      ppl: number;
      valueExtendedHours: number;
      quantity: number;
      maxBuy: number;
      maxSell: number;
      maxOpenBuy: number;
      maxOpenSell: number;
      frontend: string;
      autoInvestQuantity: number;
      fxPpl?: number;
      lockedQuantity: number;
      sellableQuantity: number;
    }[];
  };
  orders: {
    unfilteredCount: number;
    items: [];
  };
  valueOrders: {
    unfilteredCount: number;
    items: [];
  };
};
