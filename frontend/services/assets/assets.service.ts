import {
  EApiTypes,
  EApiUrls,
  useAPI,
} from "~/services/apiWrapper/useFetchWrapper";
import type { ACTIVE_TYPE } from "~/types/transaction.types";
import type { IHistoryPayload } from "~/layers/Portfolio/store/Portfolio.store";
import type { IPortfolioHistory } from "~/services/portfolio/portfolio.service";

export interface IAsset {
  coinGeckoId: string | null;
  currentPrice: number;
  icon: string;
  id: number;
  isin: string | null;
  moexId: string | null;
  name: string;
  ticker: string;
  type: ACTIVE_TYPE;
}

export const searchAssets = (searchQuery: string) => {
  return useAPI<IAsset[], IAsset[]>(
    "search-assets",
    "/api/assets",
    {
      baseUrl: EApiUrls.BASE,
      type: EApiTypes.AUTH,
    },
    {
      after: {
        lazy: true,
      },
      fetch: {
        query: {
          search: searchQuery,
        },
      },
    },
  );
};

export interface ICGFetchCryptoResponse {
  id: string;
  market_data: {
    current_price: {
      usd: number;
    };
  };
  name: string;
  symbol: string;
}

export const fetchCryptoPrice = (coingeckoId: string, priceDate: string) => {
  return useAPI<ICGFetchCryptoResponse, ICGFetchCryptoResponse>(
    "coingecko-price",
    `api/v3/coins/${coingeckoId}/history`,
    {
      baseUrl: EApiUrls.COINGECKO,
      type: EApiTypes.AUTH,
    },
    {
      after: {
        lazy: true,
      },
      fetch: {
        query: {
          date: priceDate,
        },
      },
    },
  );
};

export const getAssetHistory = ({ assetId, ticker, type }: IHistoryPayload) => {
  return useAPI<IPortfolioHistory[], IPortfolioHistory[]>(
    "asset-history",
    `api/portfolios/history/${ticker}`,
    {
      baseUrl: EApiUrls.BASE,
      type: EApiTypes.AUTH,
    },
    {
      after: {
        lazy: true,
      },
      fetch: {
        query: {
          assetId,
          type,
        },
      },
    },
  );
};
