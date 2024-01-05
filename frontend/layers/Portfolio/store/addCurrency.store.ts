import type { ICrypto } from "~/layers/Portfolio/services/crypto/crypto.types";

export const useAddCurrencyStore = defineStore("addCurrency", () => {
  const amount = ref(null);
  const stackingPercentage = ref(null);
  const selectedActive = ref<ICrypto | null>(null);

  return {
    amount,
    selectedActive,
    stackingPercentage,
  };
});
