<template>
  <div class="general-info__container">
    <p>Блок с информацией о портфеле</p>
    <p>TODO Добавить запрос на инфу о текущем состоянии портфеля</p>
    <p>Текущий баланс: {{ portfolioStore.totalPortfolioValue }} $</p>
  </div>
</template>
<script setup lang="ts">
import { usePortfolioStore } from "~/layers/Portfolio/store/Portfolio.store";

const portfolioStore = usePortfolioStore();
</script>

<style scoped>
.general-info__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90px;
  font-size: 20px;
  font-weight: 700;
  border: 1px solid;
}
</style>
