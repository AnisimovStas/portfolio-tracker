import { getPortfolioHistory } from "~/services/portfolio/portfolio.service";
import { dateViewModel } from "~/utils/date";

export enum ChartPeriod {
  WEEK = 7,
  MONTH = 30,
  YEAR = 365,
  ALL = 0,
}
export const usePortfolioHistoryStore = defineStore("portfolioHistory", () => {
  const { data, execute } = getPortfolioHistory();

  const fetchHistory = async () => {
    await execute();
  };

  const selectedChartPeriod = ref<ChartPeriod>(ChartPeriod.ALL);

  const isWeekAvailable = computed(() => {
    if (!data.value) return false;
    return data.value.length >= 7;
  });

  const isMonthAvailable = computed(() => {
    if (!data.value) return false;
    return data.value.length >= 30;
  });

  const isYearAvailable = computed(() => {
    if (!data.value) return false;
    return data.value.length >= 365;
  });

  const priceValueHistory = computed(() => {
    if (!data.value) return [];
    const mappedPrices = data.value
      .map((item) => {
        return {
          date: dateViewModel(item.date),
          value: item.priceValue,
        };
      })
      .reverse();

    if (selectedChartPeriod.value === ChartPeriod.WEEK) {
      return mappedPrices.slice(0, 7);
    }
    if (selectedChartPeriod.value === ChartPeriod.MONTH) {
      return mappedPrices.slice(0, 30);
    }
    if (selectedChartPeriod.value === ChartPeriod.YEAR) {
      return mappedPrices.slice(0, 365);
    }
    return mappedPrices;
  });

  const profitHistory = computed(() => {
    if (!data.value) return [];
    const mappedProfit = data.value
      .map((item) => {
        return {
          date: dateViewModel(item.date),
          value: item.profit,
        };
      })
      .reverse();

    if (selectedChartPeriod.value === ChartPeriod.WEEK) {
      return mappedProfit.slice(0, 7);
    }
    if (selectedChartPeriod.value === ChartPeriod.MONTH) {
      return mappedProfit.slice(0, 30);
    }
    if (selectedChartPeriod.value === ChartPeriod.YEAR) {
      return mappedProfit.slice(0, 365);
    }
    return mappedProfit;
  });

  return {
    data,
    fetchHistory,
    isMonthAvailable,
    isWeekAvailable,
    isYearAvailable,
    priceValueHistory,
    profitHistory,
    selectedChartPeriod,
  };
});
