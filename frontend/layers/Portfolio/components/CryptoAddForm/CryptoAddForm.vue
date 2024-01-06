<template>
  <div class="crypto-form__container">
    <UInput
      v-model="addCurrencyStore.amount"
      label="Количество"
      placeholder="Количество"
      type="number"
    />
    <UCheckbox v-model="isStacking" label="Стейкинг?" />
    <UInput
      v-if="isStacking"
      v-model="addCurrencyStore.stackingPercentage"
      label="Проценты стейкинга"
      placeholder="Проценты стейкинга"
      type="number"
    >
      <template #trailing>
        <span class="text-gray-500 dark:text-gray-400 text-xs"> %</span>
      </template>
    </UInput>
  </div>
</template>
<script setup lang="ts">
import { useAddCurrencyStore } from "~/layers/Portfolio/store/addCurrency.store";

const addCurrencyStore = useAddCurrencyStore();

const isStacking = ref<boolean>(false);
</script>
<style scoped>
.crypto-form__container {
  display: flex;
  flex-direction: column;
}
</style>
