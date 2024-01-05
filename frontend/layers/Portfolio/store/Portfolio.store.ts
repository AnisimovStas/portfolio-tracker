export interface IPortfolioCryptoRow {
  coinGeckoId: string;
  currentPrice: string;
  description: string;
  icon: string;
  id: number;
  name: string;
  stackingPercentage: number;
  ticker: string;
  totalAmount: number;
  totalPrice: number;
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
