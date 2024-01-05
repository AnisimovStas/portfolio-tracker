<template>
  <div class="active__searchbar">
    <USelectMenu
      v-model="addCurrencyStore.selectedActive"
      :searchable="search"
      searchable-placeholder="Найти актив"
      placeholder="Найти актив"
      option-attribute="name"
      by="id"
    />
  </div>
</template>
<script setup lang="ts">
import type { ICrypto } from "~/layers/Portfolio/services/crypto/crypto.types";
import { useAddCurrencyStore } from "~/layers/Portfolio/store/addCurrency.store";

const addCurrencyStore = useAddCurrencyStore();

const loading = ref(false);

async function search(query: string) {
  loading.value = true;

  const actives = await $fetch<ICrypto>(
    `http://localhost:9229/api/currencies/crypto/list/search`,
    {
      query: {
        search: query,
      },
    },
  );

  loading.value = false;
  return actives;
}
</script>

<style scoped>
.active__searchbar {
  width: 300px;
  height: 300px;
}
</style>
