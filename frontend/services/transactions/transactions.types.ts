export type TTransaction = "buy" | "sell";
export type TCurrencyType = "fiat" | "crypto";

export interface ICryptoPayload {
  amount: string;
  currencyType: TCurrencyType;
  date: string;
  description: string;
  stackingPercentage: string;
  ticker: string;
  transactionType: TTransaction;
}
