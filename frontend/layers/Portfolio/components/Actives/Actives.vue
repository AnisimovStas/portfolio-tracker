<template>
  <div class="container">
    <div class="actives__header">
      <div class="header__title">Хеддер блока с активами</div>
      <button @click="navigateTo('/profile/addCurrency')">
        Добавить актив
      </button>
    </div>
    <div class="active__block">
      Блок с криптовалютами

      <Active
        v-for="crypto in portfolioStore.data?.crypto"
        :key="crypto.id"
        :active="crypto"
      />
    </div>
    <div class="active__block">Блок с ру акциями</div>
    <div class="active__block">Блок с ру облигациями</div>
    <div class="active__block">Блок с фондами</div>
  </div>
</template>
<script setup lang="ts">
import { usePortfolioStore } from "~/layers/Portfolio/store/Portfolio.store";
import Active from "~/layers/Portfolio/components/Active/Active.vue";

const portfolioStore = usePortfolioStore();
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-s);
  width: 100%;
  border: 1px solid;
}

.actives__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
}

.header__title {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}

.active__block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  border: 1px solid;
}
</style>
