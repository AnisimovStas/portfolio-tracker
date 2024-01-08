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
          {{ active.totalPrice }}
          $
        </p>
        <div class="profit__info">
          <p>
            {{
              active.profit.toString().startsWith("-")
                ? active.profit
                : `+${active.profit}`
            }}
            $
          </p>
          <p>
            {{
              active.profitPercentage.toString().startsWith("-")
                ? active.profitPercentage
                : `+${active.profitPercentage}`
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
          <div class="flex border justify-center items-center w-1/3">
            График исторической стоимости
          </div>
          <div class="flex border justify-center items-center w-1/3">
            График стоимости портфеле
          </div>
          <div class="flex flex-col gap-0.5 w-1/3">
            <p>
              % от всего портфеля:
              {{ percentOfTotalPortfolio }}
            </p>
            <p>% от {{ percentOfTotalBlock }}</p>
            <p>Находится в портфеле с: {{ active.transactions[0].date }}</p>
            <p>Средняя цена покупки: {{ active.averagePrice }} $</p>
            <p v-if="active.stackingPercentage > 0">
              Процент стейкинга: {{ active.stackingPercentage }} %
            </p>
            <p v-if="active.stackingPercentage > 0">
              Получено от стейкинга: {{ active.totalStackedAmount }}
              {{ active.ticker.toUpperCase() }} ||
              {{ active.totalStackedInFiat }} $
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
import { $fetch } from "ofetch";
import type { IActiveTypesProps } from "~/layers/Portfolio/components/Active/Active.types";
import { usePortfolioStore } from "~/layers/Portfolio/store/Portfolio.store";

const props = defineProps<IActiveTypesProps>();

const portfolioStore = usePortfolioStore();

const modifiedDescription = ref(props.active.description);

const isDescriptionChanged = computed(() => {
  return props.active.description !== modifiedDescription.value;
});

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
  if (isDescriptionChanged.value) {
    await $fetch("http://localhost:9229/api/portfolios/update-description", {
      body: {
        newDescription: modifiedDescription.value,
        portfolioRowId: props.active.portfolioRowId,
        rowType: props.blockType,
      },
      headers: {
        Authorization: `Bearer ${useCookie("authorization").value}`,
      },
      method: "PUT",
    });
  }
};

const isOpen = ref(false);

const computeSrc = computed(() => {
  return `http://localhost:9229${props.active.icon}`;
});

const percentOfTotalPortfolio = computed(() => {
  return (
    (
      (props.active.totalPrice / portfolioStore.totalPortfolioValue) *
      100
    ).toFixed(2) + "%"
  );
});

const percentOfTotalBlock = computed(() => {
  const blockMapping = {
    crypto: "криптовалюты: ",
    stock: "акций: ",
  }[props.blockType];

  return (
    blockMapping +
    ((props.active.totalPrice / props.totalBlockValue) * 100).toFixed(2) +
    "%"
  );
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
