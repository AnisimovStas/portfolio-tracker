<template>
  <div class="general-info__container">
    <div
      v-if="portfolioStore.generalInfo?.totalAmount"
      class="flex justify-start items-center w-full"
    >
      <p>{{ total }} $</p>
    </div>
    <div
      v-if="baseLabel"
      class="flex items-center gap-3 w-full justify-start cursor-pointer"
      @click="selectedBadgeHandler"
    >
      <UBadge :label="label" :color="labelColor" size="md" />
      <p v-if="selectedBadge === 'allTime'">за все время</p>
      <p v-else>за сегодня</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePortfolioStore } from "~/layers/Portfolio/store/Portfolio.store";
import { formatCurrency } from "~/utils/currency";

const portfolioStore = usePortfolioStore();

const selectedBadge = ref("allTime");

const selectedBadgeHandler = () => {
  if (selectedBadge.value === "allTime") {
    selectedBadge.value = "today";
  } else {
    selectedBadge.value = "allTime";
  }
};

const baseLabel = computed(() => {
  return selectedBadge.value === "allTime"
    ? portfolioStore.generalInfo?.allTimeProfit
    : portfolioStore.generalInfo?.dailyProfit;
});

const isLabelPositive = computed(() => {
  if (!baseLabel.value) return false;
  return baseLabel.value > 0;
});

const labelColor = computed(() => {
  return isLabelPositive.value ? "green" : "red";
});

const percentage = computed(() => {
  if (!baseLabel.value || !portfolioStore.generalInfo?.totalAmount) return 0;

  return (
    (baseLabel.value /
      (portfolioStore.generalInfo.totalAmount - baseLabel.value)) *
    100
  );
});

const label = computed(() => {
  let labelResult = "";
  labelResult += isLabelPositive.value ? "+" : "-";

  return `${labelResult}${formatCurrency(baseLabel.value)} ${percentage.value.toFixed(2)}%`;
});

const total = computed(() => {
  return formatCurrency(portfolioStore.generalInfo?.totalAmount);
});
</script>

<style scoped>
.general-info__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90px;
  padding: 4px;
  font-size: 20px;
  font-weight: 700;
  border: 1px solid;
}
</style>
