<template>
  <div
    class="flex gap-2 flex-col w-full bg-red-50 border rounded-2xl overflow-hidden active__animated z-10"
  >
    <div
      class="flex justify-between items-center cursor-pointer p-2 bg-red-50 z-30"
      @click="isOpen = !isOpen"
    >
      <div class="left-side">
        <NuxtImg :width="50" :height="50" :src="computeSrc" />
        <div class="general__info">
          <p>{{ active.name }}</p>
          <div class="prices">
            <p>{{ active.totalAmount }} {{ active.ticker.toUpperCase() }}</p>
            <p>{{ active.currentPrice }} $</p>
          </div>
        </div>
      </div>
      <div class="right-side">
        <p>
          {{ active.totalCurrentPrice }}
          $
        </p>
        <div class="profit__info">
          <p>
            {{
              active.profit.value.toString().startsWith("-")
                ? active.profit.value
                : `+${active.profit.value}`
            }}
            $
          </p>
          <p>
            {{
              active.profit.percentage.toString().startsWith("-")
                ? active.profit.percentage
                : `+${active.profit.percentage}`
            }}%
          </p>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div
        v-if="isOpen"
        class="flex flex-col bg-gray-700 p-2 gap-2 w-full z-20"
      >
        <div class="flex justify-between w-full">
          <ClientOnly placeholder="loading...">
            <div class="flex border justify-center items-center w-1/3">
              <div v-if="priceChartData && priceChartData.length > 0">
                <Chart
                  :data="priceChartData"
                  :preset="PRESET.ACTIVE"
                  :chart-color-preset="CHART_COLOR_PRESET.BLUE"
                  :label="`${props.active.name}  в портфеле`"
                />
                <p>График value {{ props.active.name }} в портфеле</p>
              </div>
              <div v-else>
                <p>Недостаточно данных для отображения</p>
              </div>
            </div>

            <div class="flex border justify-center items-center w-1/3">
              <div v-if="profitChartData && profitChartData.length > 0">
                <Chart
                  :data="profitChartData"
                  :preset="PRESET.ACTIVE"
                  :chart-color-preset="CHART_COLOR_PRESET.BLUE"
                  :label="`Профит ${props.active.name}`"
                />
                <p>График профита {{ props.active.name }} в портфеле</p>
              </div>
              <div v-else>
                <p>Недостаточно данных для отображения</p>
              </div>
            </div>
            <div
              v-if="isStackingChartShow"
              class="flex border justify-center items-center w-1/3"
            >
              <div
                v-if="
                  earnedByStackingChartData &&
                  earnedByStackingChartData.length > 0
                "
              >
                <Chart
                  v-if="earnedByStackingChartData"
                  :data="earnedByStackingChartData"
                  :preset="PRESET.ACTIVE"
                  :chart-color-preset="CHART_COLOR_PRESET.BLUE"
                  :label="`Получено от стейкинга ${props.active.name}`"
                />
                <p>График наград за стейкинг {{ props.active.name }}</p>
              </div>
              <div v-else>
                <p>Недостаточно данных для отображения</p>
              </div>
            </div>
          </ClientOnly>
          <div class="flex flex-col gap-0.5 w-1/3">
            <p>
              % от всего портфеля:
              {{ percentOfTotalPortfolio }}
            </p>
            <p>% от {{ percentOfTotalBlock }}</p>
            <p>Находится в портфеле с: {{ active.transactions[0].date }}</p>
            <p>Средняя цена покупки: {{ active.averageBuyPrice }} $</p>
            <p v-if="active.earnedByStacking > 0">
              Получено от стейкинга: {{ active.earnedByStacking }}
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-0.5">
          <p>Заметка о {{ active.name }}:</p>
          <UTextarea
            v-model="modifiedDescription"
            placeholder="Добавить заметку о активе"
            @blur="descriptionHandler"
          />
        </div>
        <div class="flex flex-col gap-0.5">
          <p>Список транзакций:</p>
          <UTable :columns="txTableColumns" :rows="txTableRowsTranslated" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
// TODO Добавить анимацию, чтобы красиво изменялась высота контейнера
import type { IActiveTypesProps } from "~/layers/Portfolio/components/Active/Active.types";
import {
  type IHistoryPayload,
  usePortfolioStore,
} from "~/layers/Portfolio/store/Portfolio.store";
import { getAssetHistory } from "~/services/assets/assets.service";
import Chart from "~/layers/Portfolio/components/Chart/Chart.vue";
import { type IPortfolioHistory } from "~/services/portfolio/portfolio.service";
import {
  CHART_COLOR_PRESET,
  PRESET,
} from "~/layers/Portfolio/components/Chart/Chart.types";

const props = defineProps<IActiveTypesProps>();

const portfolioStore = usePortfolioStore();

const modifiedDescription = ref(props.active.description);

// const isDescriptionChanged = computed(() => {
//   return props.active.description !== modifiedDescription.value;
// });

const txTableColumns = [
  {
    key: "date",
    label: "Дата",
  },
  {
    key: "transactionType",
    label: "Тип",
  },
  {
    key: "amount",
    label: "Количество",
  },
  {
    key: "priceAtDate",
    label: "Цена",
  },
];

const txTableRowsTranslated = computed(() => {
  return props.active.transactions.map((tx) => {
    return {
      ...tx,
      transactionType: tx.transactionType === "buy" ? "Покупка" : "Продажа",
    };
  });
});

const descriptionHandler = async () => {
  // if (isDescriptionChanged.value) {
  //   await $fetch("http://localhost:9229/api/portfolios/update-description", {
  //     body: {
  //       newDescription: modifiedDescription.value,
  //       portfolioRowId: props.active.portfolioRowId,
  //       rowType: props.blockType,
  //     },
  //     headers: {
  //       Authorization: `Bearer ${useCookie("authorization").value}`,
  //     },
  //     method: "PUT",
  //   });
  // }
};

const isOpen = ref(false);

const computeSrc = computed(() => {
  return `http://localhost:9229${props.active.icon}`;
});

const percentOfTotalPortfolio = computed(() => {
  return (
    (
      (props.active.totalCurrentPrice / portfolioStore.totalPortfolioValue) *
      100
    ).toFixed(2) + "%"
  );
});

const percentOfTotalBlock = computed(() => {
  const blockMapping = {
    CRYPTO: "криптовалюты: ",
    STOCKS: "акций: ",
  }[props.blockType];

  return (
    blockMapping +
    ((props.active.totalCurrentPrice / props.totalBlockValue) * 100).toFixed(
      2,
    ) +
    "%"
  );
});

const historyPayload = computed<IHistoryPayload>(() => {
  return {
    assetId: props.active.id,
    ticker: props.active.ticker,
    type: props.blockType,
  };
});

const historicalPrice = ref<IPortfolioHistory[]>([]);
watch(
  () => isOpen.value,
  async (value) => {
    if (value) {
      const { data, execute: fetchHistoricalData } = getAssetHistory(
        historyPayload.value,
      );

      await fetchHistoricalData();
      if (!data.value) return;
      historicalPrice.value.push(...data.value);
    }

    if (!value) {
      historicalPrice.value = [];
    }
  },
);

const priceChartData = computed(() => {
  if (!historicalPrice.value) {
    return [];
  }
  return historicalPrice.value
    .map((item) => {
      return {
        date: dateViewModel(item.date),
        value: item.priceValue,
      };
    })
    .reverse();
});

const profitChartData = computed(() => {
  if (!historicalPrice.value) {
    return [];
  }
  return historicalPrice.value
    .map((item) => {
      return {
        date: dateViewModel(item.date),
        value: item.profit,
      };
    })
    .reverse();
});

const earnedByStackingChartData = computed(() => {
  if (!historicalPrice.value) {
    return [];
  }
  return historicalPrice.value
    .map((item) => {
      return {
        date: dateViewModel(item.date),
        value: item.earnedAmountByStacking ?? 0,
      };
    })
    .reverse();
});

const isStackingChartShow = computed(() => {
  if (earnedByStackingChartData.value.length === 0) {
    return false;
  }
  return earnedByStackingChartData.value.some((item) => item.value > 0);
});
</script>
<style scoped>
.left-side {
  display: flex;
  gap: var(--gap-xs);
  align-items: center;
}

.general__info {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
}

.prices {
  display: flex;
  gap: var(--gap-xs);
}

.right-side {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
  align-items: flex-start;
}

.profit__info {
  display: flex;
  gap: var(--gap-xs);
  align-items: center;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-200px);
}
</style>
