import { Transaction } from '../../transactions/transaction.entity';

export interface IProfit {
  value: number;
  percentage: number;
}
export interface CryptoViewModelType {
  id: number;
  coinGeckoId: string;
  name: string;
  ticker: string;
  icon: string;
  /*
   * earnedAmountByStacking: сколько пользователь заработал на стейкинге (в монетках)
   */
  earnedAmountByStacking: number;
  /*
   * averagePrice: средняя цена покупки
   */
  averageBuyPrice: number;

  /*
   * earnedByStacking: сколько пользователь заработал на стейкинге по текущему базовому курсу
   */
  earnedByStacking: number;
  /*
   * totalAmount: количество монет у пользователя на балансе
   */
  totalAmount: number;
  /*
   * totalCurrentPrice: текущая цена монеты * количетво у пользователя на балансе
   */
  totalCurrentPrice: number;
  /*
   * deposited: количество денег сколько внес пользователь
   */
  deposited: number;
  /*
   * profit: Профит с учетом стэйкинга
   */
  profit: IProfit;
  currentPrice: number;
  description: string | null;
  transactions: Transaction[];
}
