import { getPortfolioHistory } from "~/services/portfolio/portfolio.service";

export const usePortfolioHistoryStore = defineStore("portfolioHistory", () => {
  const { data, execute } = getPortfolioHistory();

  const fetchHistory = async () => {
    await execute();
  };

  const priceValueHistory = computed(() => {
    if (!data.value) return [];
    return data.value.map((item) => {
      return {
        date: item.date,
        value: item.priceValue,
      };
    });
  });

  const profitHistory = computed(() => {
    if (!data.value) return [];
    return data.value.map((item) => {
      return {
        date: item.date,
        value: item.profit,
      };
    });
  });

  return {
    data,
    fetchHistory,
    priceValueHistory,
    profitHistory,
  };
});
