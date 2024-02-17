import { getCrypto } from "~/services/crypto/crypto.service";

export const usePortfolioStore = defineStore("portfolio", () => {
  const { data: crypto, execute } = getCrypto();

  const fetchCrypto = async () => {
    if (crypto.value) return;
    await execute();
  };

  return {
    crypto,
    fetchCrypto,
  };
});
