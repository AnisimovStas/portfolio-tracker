<template>
  <div class="chart__container">
    <ClientOnly placeholder="loading...">
      <Line :options="options" :data="chartData" />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export interface IChartData {
  date: string;
  value: number;
}
export interface IChartProps {
  data: IChartData[];
  label: string;
}

const props = defineProps<IChartProps>();

const options = computed<ChartOptions<"line">>(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        intersect: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "#374151",
        },
        ticks: {
          color: "#374151",
        },
      },
      y: {
        grid: {
          color: "#374151",
        },
        ticks: {
          color: "#374151",
        },
      },
    },
  };
});

const labels = computed(() => {
  return props.data.map((item) => item.date);
});

const data = computed(() => {
  return props.data.map((item) => item.value);
});

const chartData = computed<ChartData<"line">>(() => {
  return {
    datasets: [
      {
        borderColor: "white",
        borderWidth: 2,
        data: data.value,
        label: props.label,
        tension: 0.4,
      },
    ],
    labels: labels.value,
  };
});
</script>
<style scoped>
.chart__container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 300px;
}
</style>
