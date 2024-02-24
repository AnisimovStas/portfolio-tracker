import { getPortfolioHistory } from "~/services/portfolio/portfolio.service";

export const usePortfolioHistoryStore = defineStore("portfolioHistory", () => {
  const { data, execute } = getPortfolioHistory();

  const fetchHistory = async () => {
    await execute();
  };

  return {
    data,
    fetchHistory,
  };
});
