<template>
  <div class="page-container gap-2">
    <ActiveSearchBar />
    <CryptoAddForm v-if="addCurrencyStore.selectedActive?.coinGeckoId" />

    <button @click="addCurrency">Add currency</button>
  </div>
</template>
<script setup lang="ts">
import type { ICryptoPayload } from "~/services/transactions/transactions.types";

import { useAuthStore } from "~/store/auth.store";
import ActiveSearchBar from "~/layers/Portfolio/components/ActiveSearchBar/ActiveSearchBar.vue";
import CryptoAddForm from "~/layers/Portfolio/components/CryptoAddForm/CryptoAddForm.vue";
import { useAddCurrencyStore } from "~/layers/Portfolio/store/addCurrency.store";

const addCurrency = async () => {
  const payload: ICryptoPayload = {
    amount: "20",
    currencyType: "crypto",
    date: "12-12-2020",
    description: "test",
    stackingPercentage: "5.5",
    ticker: "dot",
    transactionType: "buy",
  };
  const { data } = await useFetch("/api/portfolios/addCurrency", {
    baseURL: "http://localhost:9229",
    body: payload,
    headers: {
      Authorization: `Bearer ${useCookie("authorization").value}`,
    },
    method: "POST",
  });

  return data.value;
};

const authStore = useAuthStore();
const addCurrencyStore = useAddCurrencyStore();
onBeforeMount(async () => {
  if (authStore.isAuth && !authStore.user) {
    await authStore.getMe();
  }
});
</script>
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
