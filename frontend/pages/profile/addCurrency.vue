<template>
  <div>
    add currency
    <v-btn @click="addTransaction">Add currency</v-btn>
  </div>
</template>
<script setup lang="ts">
import type { ICreateTransactionBody } from "~/services/transactions/transactions.types";

import { useAuthStore } from "~/store/auth.store";

const addTransaction = async () => {
  const payload: ICreateTransactionBody = {
    amount: "100",
    currencyType: "crypto",
    date: "12-12-2012",
    ticker: "BTC",
    transactionType: "buy",
  };
  const { data } = await useFetch("/api/transactions/create", {
    baseURL: "http://localhost:9229",
    body: payload,
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
