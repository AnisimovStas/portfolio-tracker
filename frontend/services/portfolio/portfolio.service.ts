import {
  EApiTypes,
  EApiUrls,
  useAPI,
} from "~/services/apiWrapper/useFetchWrapper";

export interface IPortfolioHistory {
  date: Date;
  earnedAmountByStacking?: number;
  priceValue: number;
  profit: number;
}

export const getPortfolioHistory = () => {
  return useAPI<IPortfolioHistory[], IPortfolioHistory[]>(
    "fetch-history",
    "/api/portfolios/history",
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
