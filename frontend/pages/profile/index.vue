<template>
  <div class="p-2 page__container">
    <Header />
    <Actives />
  </div>
</template>

<script setup lang="ts">
import Actives from "~/layers/Portfolio/components/Actives/Actives.vue";
import { usePortfolioStore } from "~/layers/Portfolio/store/Portfolio.store";
import { usePortfolioHistoryStore } from "~/layers/Portfolio/store/Portfolio-history.store";
import Header from "~/layers/Portfolio/Header/Header.vue";

const portfolioStore = usePortfolioStore();
const portfolioHistoryStore = usePortfolioHistoryStore();

useAsyncData("fetchCrypto", () => {
  const promises = [
    portfolioStore.fetchCrypto(),
    portfolioHistoryStore.fetchHistory(),
  ];

  Promise.all(promises);
});
</script>
