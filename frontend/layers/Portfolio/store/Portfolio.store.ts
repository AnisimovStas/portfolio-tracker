import { getCrypto, type ICrypto } from "~/services/crypto/crypto.service";

export const usePortfolioStore = defineStore("portfolio", () => {
  const { data: cryptos, execute } = getCrypto();

  const fetchCrypto = async () => {
    // if (cryptos.value) return;
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
