import {
  EApiTypes,
  EApiUrls,
  useAPI,
} from "~/services/apiWrapper/useFetchWrapper";

import type { TRANSACTION_TYPE } from "~/services/transactions/transactions.types";

export interface ITransaction {
  amount: number;
  date: string;
  description: string | null;
  id: number;
  priceAtDate: number;
  stackingPercentage: number;
  transactionType: TRANSACTION_TYPE;
}

export interface IProfit {
  percentage: number;
  value: number;
}

export interface ICrypto {
  /*
   * averagePrice: средняя цена покупки
   */
  averageBuyPrice: number;
  coinGeckoId: string;
  currentPrice: number;
  /*
   * deposited: количество денег сколько внес пользователь
   */
  deposited: number;
  description: string | null;
  /*
   * earnedAmountByStacking: сколько пользователь заработал на стейкинге (в монетках)
   */
  earnedAmountByStacking: number;
  /*
   * earnedByStacking: сколько пользователь заработал на стейкинге по текущему базовому курсу
   */
  earnedByStacking: number;

  icon: string;
  id: number;
  name: string;
  /*
   * profit: Профит с учетом стэйкинга
   */
  profit: IProfit;
  ticker: string;
  /*
   * totalAmount: количество монет у пользователя на балансе
   */
  totalAmount: number;
  /*
   * totalCurrentPrice: текущая цена монеты * количетво у пользователя на балансе
   */
  totalCurrentPrice: number;
  transactions: ITransaction[];
}

export const getCrypto = () => {
  return useAPI<ICrypto[], ICrypto[]>(
    "fetch-crypto",
    "/api/assets/crypto",
    {
      baseUrl: EApiUrls.BASE,
      type: EApiTypes.AUTH,
    },
    {
      after: {
        lazy: true,
      },
    },
  );
};
