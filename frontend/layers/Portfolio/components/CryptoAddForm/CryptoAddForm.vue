<template>
  <div
    v-if="addCurrencyStore.selectedActive"
    class="crypto-form__container gap-2"
  >
    <div class="flex gap-2 items-center justify-center">
      <UButton
        label="Купить"
        :variant="addCurrencyStore.isBuyTx ? 'solid' : 'ghost'"
        @click="addCurrencyStore.isBuyTx = true"
      />
      <UButton
        color="red"
        label="Продать"
        :variant="addCurrencyStore.isBuyTx ? 'ghost' : 'solid'"
        @click="addCurrencyStore.isBuyTx = false"
      />
    </div>
    <UInput
      v-model="addCurrencyStore.amount"
      label="Количество"
      placeholder="Количество"
      type="number"
    >
      <template #trailing>
        <span class="text-gray-500 dark:text-gray-400 text-xs">
          {{ addCurrencyStore?.selectedActive?.ticker?.toUpperCase() }}</span
        >
      </template>
    </UInput>

    <UPopover :popper="{ placement: 'bottom-start' }">
      <UButton :label="label">
        <template #leading>
          <SvgoCalendarIcon />
        </template>
      </UButton>

      <template #panel="{ close }">
        <LazyDatePicker v-model="addCurrencyStore.txDate" @close="close" />
      </template>
    </UPopover>

    <UCheckbox
      v-if="addCurrencyStore.isBuyTx"
      v-model="addCurrencyStore.isStacking"
      label="Стейкинг?"
    />
    <UInput
      v-if="addCurrencyStore.isStacking"
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

const label = computed(
  () =>
    `Дата приобритения: ${addCurrencyStore.txDate.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })}`,
);
</script>
<style scoped>
.crypto-form__container {
  display: flex;
  flex-direction: column;
}
</style>
