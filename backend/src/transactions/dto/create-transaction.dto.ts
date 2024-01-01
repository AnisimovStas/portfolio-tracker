export type TTransaction = 'buy' | 'sell';
export type TCurrencyType = 'fiat' | 'crypto';

export interface CreateTransactionDto {
  ticker: string;
  amount: string;
  transactionType: TTransaction;
  currencyType: TCurrencyType;
  date: string;
}
