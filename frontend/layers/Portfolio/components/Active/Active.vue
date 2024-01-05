<template>
  <div class="active__container">
    <div class="left-side">
      <NuxtImg :width="50" :height="50" :src="computeSrc" />
      <div class="general__info">
        <p>{{ active.name }}</p>
        <div class="prices">
          <p>{{ active.totalAmount }}</p>
          <p>{{ active.currentPrice }}</p>
        </div>
      </div>
    </div>
    <div class="right-side">
      <p>{{ active.totalPrice }}</p>
      <div class="profit__info">
        <p>{{ active.profit }}</p>
        <p>{{ active.profitPercentage }}%</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IActiveTypesProps } from "~/layers/Portfolio/components/Active/Active.types";

const props = defineProps<IActiveTypesProps>();

const computeSrc = computed(() => {
  return `http://localhost:9229${props.active.icon}`;
});
</script>
<style scoped>
.active__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--gap-s);
}

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
  align-items: start;
}

.profit__info {
  display: flex;
  gap: var(--gap-xs);
  align-items: center;
}
</style>
