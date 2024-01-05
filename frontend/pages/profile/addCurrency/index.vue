<template>
  <div class="page-container">
    <ActiveSearchBar
      :active-name="activeName"
      :actives="actives"
      :loading="pending"
      @update:active-name="updateHandler($event)"
    />
    <CryptoAddForm
      v-if="selectedActive?.coinGeckoId"
      v-model:amount="amount"
      v-model:stacking-percentage="stackingPercentage"
    />

    <button @click="addCurrency">Add currency</button>
  </div>
</template>
<script setup lang="ts">
import type { ICryptoPayload } from "~/services/transactions/transactions.types";

import { useAuthStore } from "~/store/auth.store";
import ActiveSearchBar from "~/layers/Portfolio/components/ActiveSearchBar/ActiveSearchBar.vue";
import type { ICrypto } from "~/layers/Portfolio/services/crypto/crypto.types";
import CryptoAddForm from "~/layers/Portfolio/components/CryptoAddForm/CryptoAddForm.vue";

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

const actives = computed(() => items.value?.map((item) => item?.name) || []);

const authStore = useAuthStore();

const activeName = ref<string | null>(null);

const selectedActive = ref<ICrypto | null>(null);
const amount = ref<string>("");
const stackingPercentage = ref<string>("");

const updateHandler = async (value: string) => {
  activeName.value = value;
  await refresh();
};

watch(
  () => activeName.value,
  () => {
    selectedActive.value =
      items.value.find((item) => item.name === activeName.value) || null;
  },
);

const {
  data: items,
  pending,
  refresh,
} = await useFetch<ICrypto>(
  `http://localhost:9229/api/currencies/crypto/list/search`,
  {
    query: {
      search: activeName,
    },
  },
);

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
