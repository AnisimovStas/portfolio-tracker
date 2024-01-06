import type { ICrypto } from "~/layers/Portfolio/services/crypto/crypto.types";
import { formatDate } from "~/utils/date";
import { ICryptoPayload } from "~/services/transactions/transactions.types";

export const useAddCurrencyStore = defineStore("addCurrency", () => {
  const amount = ref(null);
  const isStacking = ref(false);
  const stackingPercentage = ref(null);
  const txDate = ref(new Date());
  const selectedActive = ref<ICrypto | null>(null);
  const isBuyTx = ref(true);

  const isPayloadFilled = computed(() => {
    return isStacking.value
      ? amount.value && stackingPercentage.value && selectedActive.value
      : amount.value && selectedActive.value;
  });

  const txDateAsPayload = computed(() => formatDate(txDate.value));

  const addCurrency = async () => {
    const payload: ICryptoPayload = {
      amount: amount.value,
      currencyType: "crypto",
      date: txDateAsPayload.value,
      description: "Примечание",
      stackingPercentage: isStacking.value ? stackingPercentage.value : "0",
      ticker: selectedActive.value.ticker,
      transactionType: isBuyTx.value ? "buy" : "sell",
    };
    try {
      await $fetch("/api/portfolios/addCurrency", {
        baseURL: "http://localhost:9229",
        body: payload,
        headers: {
          Authorization: `Bearer ${useCookie("authorization").value}`,
        },
        method: "POST",
      });

      await navigateTo("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    addCurrency,
    amount,
    isBuyTx,
    isPayloadFilled,
    isStacking,
    selectedActive,
    stackingPercentage,
    txDate,
    txDateAsPayload,
  };
});
