<template>
  <div class="charts__container">
    <div v-for="item in items" :key="item.value">
      <Chart v-if="activeChart === item.value" :data="item.data" />
    </div>

    <UTabs v-model="activeChart" :items="items" />
  </div>
</template>
<script setup lang="ts">
import Chart from "~/layers/Portfolio/components/Chart/Chart.vue";

const activeChart = ref(1);

const items = [
  {
    data: ["График общей стоимости"],
    label: "График общей стоимости",
    value: 0,
  },
  { data: ["График профита"], label: "График профита", value: 1 },
];
</script>

<style scoped>
.charts__container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  border: 1px solid;
}
</style>
