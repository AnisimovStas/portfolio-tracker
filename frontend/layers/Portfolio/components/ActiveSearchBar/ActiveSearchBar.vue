<template>
  <div class="active__searchbar">
    <USelectMenu
      v-model="addCurrencyStore.selectedActive"
      :searchable="search"
      searchable-placeholder="Найти актив"
      placeholder="Найти актив"
      option-attribute="name"
      by="id"
      autofocus
    />
  </div>
</template>
<script setup lang="ts">
import type { ISearchResponse } from "~/layers/Portfolio/services/crypto/crypto.types";
import { useAddCurrencyStore } from "~/layers/Portfolio/store/addCurrency.store";

const addCurrencyStore = useAddCurrencyStore();

const loading = ref(false);

async function search(query: string) {
  loading.value = true;

  const actives = await $fetch<ISearchResponse>(
    `http://localhost:9229/api/search/currencies`,
    {
      query: {
        search: query,
      },
    },
  );

  const modifiedCrypto = actives.crypto.map((crypto) => {
    return {
      ...crypto,
      currencyType: "crypto",
    };
  });

  const modifiedRuStocks = actives.ruStocks.map((ruStocks) => {
    return {
      ...ruStocks,
      currencyType: "ruStocks",
    };
  });

  const mappedActives = [...modifiedCrypto, ...modifiedRuStocks].sort(
    (a, b) => a.id - b.id,
  );
  loading.value = false;
  return mappedActives;
}
</script>

<style scoped>
.active__searchbar {
  width: 300px;
}
</style>
