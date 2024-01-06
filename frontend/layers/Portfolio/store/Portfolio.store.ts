export interface ICryptoRowTransaction {
  amount: number;
  date: Date;
  id: number;
  priceAtDate: number;
  ticker: string;
  transactionType: string;
}
export interface IPortfolioCryptoRow {
  averagePrice: number;
  coinGeckoId: string;
  currentPrice: string;
  description: string;
  icon: string;
  id: number;
  name: string;
  portfolioRowId: number;
  profit: number;
  profitPercentage: string;
  stackingPercentage: number;
  ticker: string;
  totalAmount: number;
  totalPrice: number;
  totalStackedAmount: number;
  totalStackedInFiat: number;
  transactions: ICryptoRowTransaction[];
  updatedAt: Date;
  userId: string;
}

export interface IPortfolio {
  crypto: IPortfolioCryptoRow[];
  id: number;
  userId: string;
}

export const usePortfolioStore = defineStore("portfolio", () => {
  const isAuthCookie = useCookie("authorization");

  const totalCryptoValue = computed(() => {
    let totalValue = 0;
    data.value?.crypto?.forEach((cryptoRow) => {
      totalValue += cryptoRow.totalPrice;
    });
    return totalValue;
  });

  const totalPortfolioValue = computed(() => {
    return totalCryptoValue.value;
  });

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
    totalCryptoValue,
    totalPortfolioValue,
  };
});
