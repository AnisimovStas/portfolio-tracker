<template>
  <div class="p-2 page__container">
    <GeneralInfo />
    <Actives />
  </div>
</template>

<script setup lang="ts">
import GeneralInfo from "~/layers/Portfolio/components/GeneralInfo/GeneralInfo.vue";
import Actives from "~/layers/Portfolio/components/Actives/Actives.vue";
import { usePortfolioStore } from "~/layers/Portfolio/store/Portfolio.store";

const portfolioStore = usePortfolioStore();

useAsyncData("fetchCrypto", portfolioStore.fetchCrypto);
</script>
