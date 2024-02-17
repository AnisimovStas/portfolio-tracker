<template>
  <div class="actives__container">
    <div class="actives__header">
      <div class="header__title">Хеддер блока с активами</div>
      <UButton
        color="white"
        variant="solid"
        @click="navigateTo('/profile/addCurrency')"
      >
        Добавить актив
      </UButton>
    </div>
    <div class="active__block p-2 gap-2">
      Блок с криптовалютами

      <Active
        v-for="crypto in portfolioStore.cryptos"
        :key="crypto.coinGeckoId"
        :total-block-value="portfolioStore.totalCryptoValue"
        :block-type="ACTIVE_TYPE.CRYPTO"
        :active="crypto"
      />
    </div>
    <div class="active__block gap-2">Блок с ру акциями</div>
    <div class="active__block">Блок с ру облигациями</div>
    <div class="active__block">Блок с фондами</div>
  </div>
</template>
<script setup lang="ts">
// TODO Зафиксить ошибки в консоли
import { usePortfolioStore } from "~/layers/Portfolio/store/Portfolio.store";
import Active from "~/layers/Portfolio/components/Active/Active.vue";
import { ACTIVE_TYPE } from "~/types/transaction.types";

const portfolioStore = usePortfolioStore();
</script>
<style scoped>
.actives__container {
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
  border: 1px solid;
}
</style>
