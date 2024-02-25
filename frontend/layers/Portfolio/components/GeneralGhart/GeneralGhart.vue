<template>
  <div class="charts__container">
    <div v-for="item in items" :key="item.value">
      <Chart
        v-if="activeChart === item.value"
        :data="item.data"
        :label="item.label"
      />
    </div>

    <UTabs v-model="selectedPeriod" :items="chartPeriods" />

    <UTabs v-model="activeChart" :items="items" />
  </div>
</template>
<script setup lang="ts">
import Chart from "~/layers/Portfolio/components/Chart/Chart.vue";
import {
  ChartPeriod,
  usePortfolioHistoryStore,
} from "~/layers/Portfolio/store/Portfolio-history.store";

const portfolioHistoryStore = usePortfolioHistoryStore();

const activeChart = ref(1);

const items = computed(() => {
  return [
    {
      data: portfolioHistoryStore.priceValueHistory,
      label: "График общей стоимости",
      value: 0,
    },
    {
      data: portfolioHistoryStore.profitHistory,
      label: "График профита",
      value: 1,
    },
  ];
});

const selectedPeriod = computed({
  get() {
    const index = chartPeriods.value.findIndex(
      (item) => item.value === portfolioHistoryStore.selectedChartPeriod,
    );
    if (index === -1) {
      return 0;
    }

    return index;
  },
  set(value) {
    if (value === 0) {
      portfolioHistoryStore.selectedChartPeriod = ChartPeriod.WEEK;
    }
    if (value === 1) {
      portfolioHistoryStore.selectedChartPeriod = ChartPeriod.MONTH;
    }
    if (value === 2) {
      portfolioHistoryStore.selectedChartPeriod = ChartPeriod.YEAR;
    }
    if (value === 3) {
      portfolioHistoryStore.selectedChartPeriod = ChartPeriod.ALL;
    }
  },
});

const chartPeriods = computed(() => {
  return [
    {
      disabled: !portfolioHistoryStore.isWeekAvailable,
      label: "7 д",
      value: ChartPeriod.WEEK,
    },
    {
      disabled: !portfolioHistoryStore.isMonthAvailable,
      label: "30 д",
      value: ChartPeriod.MONTH,
    },
    {
      disabled: !portfolioHistoryStore.isYearAvailable,
      label: "365 д",
      value: ChartPeriod.YEAR,
    },
    {
      label: "Все время",
      value: ChartPeriod.ALL,
    },
  ];
});
</script>

<style scoped>
.charts__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 400px;
  border: 1px solid;
}
</style>
