import {
  EApiTypes,
  EApiUrls,
  useAPI,
} from "~/services/apiWrapper/useFetchWrapper";
import type { IAsset } from "~/services/assets/assets.service";
import type { ACTIVE_TYPE } from "~/types/transaction.types";
import type { TRANSACTION_TYPE } from "~/services/transactions/transactions.types";

export interface IAddCryptoTransactionBody {
  amount: number;
  assetType: ACTIVE_TYPE;
  date: string;
  priceAtDate: number;
  stackingPercentage: number;
  ticker: string;
  transactionType: TRANSACTION_TYPE;
}

export const addCryptoTransaction = (payload: IAddCryptoTransactionBody) => {
  return useAPI<IAsset, IAsset>(
    "search-assets",
    "/api/transactions/crypto",
    {
      baseUrl: EApiUrls.BASE,
      type: EApiTypes.AUTH,
    },
    {
      after: {
        lazy: true,
      },
      fetch: {
        body: payload,
        method: "POST",
      },
    },
  );
};
