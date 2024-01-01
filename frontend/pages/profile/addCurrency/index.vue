<template>
  <div class="page-container">
    add currency
    <v-btn @click="addCurrency">Add currency</v-btn>
  </div>
</template>
<script setup lang="ts">
import type { ICryptoPayload } from "~/services/transactions/transactions.types";

import { useAuthStore } from "~/store/auth.store";

const addCurrency = async () => {
  const payload: ICryptoPayload = {
    amount: "100",
    currencyType: "crypto",
    date: "12-12-2012",
    description: "test",
    stackingPercentage: "0",
    ticker: "btc",
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
  justify-content: start;
}
</style>
