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

export interface ICrypto {
  coinGeckoId: string;
  currentPrice: number;
  deposited: number;
  description: string | null;
  earnedByStacking: number;
  icon: string;
  name: string;
  profit: {
    percentage: number;
    value: number;
  };
  ticker: string;
  totalAmount: number;
  totalCurrentPrice: number;
  transactions: ITransaction[];
}

export const getCrypto = () => {
  return useAPI<ICrypto[], ICrypto[]>(
    "all-cases",
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
