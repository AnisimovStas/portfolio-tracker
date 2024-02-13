export type TCurrencyType = "fiat" | "crypto";
export enum TRANSACTION_TYPE {
  BUY = "buy",
  SELL = "sell",
}

export interface ICryptoPayload {
  amount: string;
  currencyType: TCurrencyType;
  date: string;
  description: string;
  stackingPercentage: string;
  ticker: string;
  transactionType: TRANSACTION_TYPE;
}
