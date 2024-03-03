import {
  fetchCryptoPrice,
  type IAsset,
  searchAssets,
} from "~/services/assets/assets.service";
import {
  addCryptoTransaction,
  type IAddCryptoTransactionBody,
} from "~/services/transactions/transaction.service";
import { ACTIVE_TYPE } from "~/types/transaction.types";
import { TRANSACTION_TYPE } from "~/services/transactions/transactions.types";
import { dateToCGFormat } from "~/utils/date";

export const useAddCurrencyStore = defineStore("addCurrency", () => {
  /*
   * активы в поисковой строке
   */
  const actives = ref<IAsset[]>([]);
  /*
   * выбранный в поисковой строке
   */
  const selectedAsset = ref<IAsset>();

  const amount = ref<number | undefined>(undefined);
  const isStacking = ref(false);
  const stackingPercentage = ref(0);
  const txDate = ref(new Date());
  const isBuyTx = ref(true);
  const priceAtDate = ref(0);

  const isPayloadFilled = computed(() => {
    return isStacking.value
      ? !!amount.value && !!stackingPercentage.value
      : !!amount.value;
  });

  watch(
    () => isBuyTx.value,
    () => {
      isStacking.value = false;
      stackingPercentage.value = 0;
    },
  );

  watch(
    () => isStacking.value,
    () => {
      stackingPercentage.value = 0;
    },
  );

  watch(
    () => [txDate.value, selectedAsset.value],
    async () => {
      if (!selectedAsset.value) return;

      if (
        selectedAsset.value.type === ACTIVE_TYPE.CRYPTO &&
        selectedAsset.value.coinGeckoId
      ) {
        const cgId = selectedAsset.value.coinGeckoId;
        const { data, execute } = fetchCryptoPrice(
          cgId,
          dateToCGFormat(txDate.value),
        );

        await execute();
        priceAtDate.value = data.value?.market_data.current_price.usd as number;
      }
    },
  );

  const addCrypto = async () => {
    const payload: IAddCryptoTransactionBody = {
      amount: amount.value!,
      assetType: ACTIVE_TYPE.CRYPTO,
      date: formatDate(txDate.value),
      priceAtDate: priceAtDate.value,
      stackingPercentage: stackingPercentage.value,
      ticker: selectedAsset.value!.ticker,
      transactionType: isBuyTx.value
        ? TRANSACTION_TYPE.BUY
        : TRANSACTION_TYPE.SELL,
    };
    const { execute } = addCryptoTransaction(payload);
    try {
      await execute();
    } catch (e) {
      console.log(e);
    }
  };

  const search = async (query: string) => {
    const { data, execute } = searchAssets(query);

    await execute();
    if (!data.value) return [];

    actives.value = data.value;
    return data.value;
  };
  return {
    actives,
    addCrypto,
    amount,
    isBuyTx,
    isPayloadFilled,
    isStacking,
    search,
    selectedAsset,
    stackingPercentage,
    txDate,
  };
});
