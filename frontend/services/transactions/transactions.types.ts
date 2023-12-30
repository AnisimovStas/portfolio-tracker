export type TTransaction = "buy" | "sell";
export type TCurrencyType = "fiat" | "crypto";

export interface ICreateTransactionBody {
  amount: string;
  currencyType: TCurrencyType;
  date: string;
  ticker: string;
  transactionType: TTransaction;
}
