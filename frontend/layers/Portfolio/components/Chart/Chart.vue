<template>
  <div class="chart__container">Cам график {{ data }}</div>
</template>
<script setup lang="ts">
export interface IChartProps {
  data: unknown[];
}

defineProps<IChartProps>();
</script>
<style scoped>
.chart__container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
