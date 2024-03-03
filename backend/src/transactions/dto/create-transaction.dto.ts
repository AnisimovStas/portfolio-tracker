import { TRANSACTION_TYPE } from '../types/transactions.types';

export type TCurrencyType = 'fiat' | 'crypto';

export interface CreateTransactionDto {
  ticker: string;
  amount: string;
  transactionType: TRANSACTION_TYPE;
  currencyType: TCurrencyType;
  date: string;
}
