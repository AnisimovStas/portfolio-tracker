import type {
  TCurrencyType,
  TTransaction,
} from "~/services/transactions/transactions.types";

export interface ICryptoData {
  coinGeckoId: string;
  currentPrice: string;
  icon: string;
  id: number;
  name: string;
  ticker: string;
  updatedAt: Date;
}

export interface ITransaction {
  amount: string;
  cryptoData: ICryptoData;
  currencyType: TCurrencyType;
  date: Date;
  id: number;
  ticker: string;
  transactionType: TTransaction;
  userId: string;
}

export interface IPortfolioCryptoRow {
  description: string;
  id: number;
  stackingPercentage: number;
  ticker: string;
  transactions: ITransaction[];
  userId: string;
}

export interface IPortfolio {
  crypto: IPortfolioCryptoRow[];
  id: number;
  userId: string;
}

export const usePortfolioStore = defineStore("portfolio", () => {
  const isAuthCookie = useCookie("authorization");

  const { data, pending, refresh } = useFetch<IPortfolio>("/api/portfolios", {
    headers: {
      Authorization: `Bearer ${isAuthCookie.value}`,
    },
  });

  const createPortfolio = async () => {
    await $fetch("/api/portfolios/create", {
      headers: {
        Authorization: `Bearer ${isAuthCookie.value}`,
      },
      method: "POST",
    });
  };

  const isPortfolioEmpty = computed(() => {
    return !data.value?.crypto;
  });

  const getActives = async () => await refresh();

  return {
    createPortfolio,
    data,
    getActives,
    isPortfolioEmpty,
    pending,
  };
});
