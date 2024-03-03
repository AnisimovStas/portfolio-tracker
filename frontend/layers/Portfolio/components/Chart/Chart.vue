<template>
  <div :class="classes">
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
import type { IChartProps } from "~/layers/Portfolio/components/Chart/Chart.types";
import {
  CHART_COLOR_PRESET,
  PRESET,
} from "~/layers/Portfolio/components/Chart/Chart.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const props = defineProps<IChartProps>();

const colors = computed(() => {
  const colors = {
    main: "white",
    side: "white",
  };

  if (props.chartColorPreset === CHART_COLOR_PRESET.BLUE) {
    colors.main = "#111827";
    colors.side = "white";
  }

  if (props.chartColorPreset === CHART_COLOR_PRESET.GREY) {
    colors.main = "#374151";
    colors.side = "white";
  }
  return colors;
});

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
          color: colors.value.main,
        },
        ticks: {
          color: colors.value.main,
        },
      },
      y: {
        grid: {
          color: colors.value.main,
        },
        ticks: {
          color: colors.value.main,
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
        borderColor: colors.value.side,
        borderWidth: 2,
        data: data.value,
        label: props.label,
        tension: 0.4,
      },
    ],
    labels: labels.value,
  };
});

const classes = computed(() => {
  let classes = "chart__container";

  if (props.preset === PRESET.ACTIVE) {
    classes += " active-preset__container";
  }

  if (props.preset === PRESET.GENERAL) {
    classes += " general-preset__container";
  }

  return classes;
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
}

.general-preset__container {
  width: 600px;
  height: 300px;
}

.active-preset__container {
  width: 300px;
  height: 200px;
}
</style>
