import { Transaction } from '../../transactions/transaction.entity';

export interface IProfit {
  value: number;
  percentage: number;
}
export interface CryptoViewModelType {
  coinGeckoId: string;
  name: string;
  ticker: string;
  icon: string;
  earnedByStacking: number;
  totalAmount: number;
  totalCurrentPrice: number;
  deposited: number;
  profit: IProfit;
  currentPrice: number;
  description: string | null;
  transactions: Transaction[];
}
