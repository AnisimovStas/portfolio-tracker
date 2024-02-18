<template>
  <div class="active__searchbar">
    <USelectMenu
      v-model="addCurrencyStore.selectedAsset"
      :searchable="addCurrencyStore.search"
      searchable-placeholder="Найти актив"
      placeholder="Найти актив"
      option-attribute="name"
      by="id"
      autofocus
    />
  </div>
</template>
<script setup lang="ts">
import { useAddCurrencyStore } from "~/layers/Portfolio/store/addCurrency.store";

const addCurrencyStore = useAddCurrencyStore();
</script>

<style scoped>
.active__searchbar {
  width: 300px;
}
</style>
