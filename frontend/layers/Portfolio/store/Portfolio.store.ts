import { getCrypto, type ICrypto } from "~/services/crypto/crypto.service";
import type { ACTIVE_TYPE } from "~/types/transaction.types";

export interface IHistoryPayload {
  assetId: number;
  ticker: string;
  type: ACTIVE_TYPE;
}

export const usePortfolioStore = defineStore("portfolio", () => {
  const { data: cryptos, execute } = getCrypto();

  const fetchCrypto = async () => {
    await execute();
  };

  const totalCryptoValue = computed(() => {
    if (!cryptos.value) return 0;
    return cryptos.value.reduce(
      (acc, crypto: ICrypto) => acc + crypto.totalCurrentPrice,
      0,
    );
  });

  const totalPortfolioValue = computed(() => {
    return totalCryptoValue.value;
  });

  return {
    cryptos,
    fetchCrypto,
    totalCryptoValue,
    totalPortfolioValue,
  };
});
