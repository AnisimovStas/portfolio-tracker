<template>
  <div class="tabs-switcher">
    <VBtnToggle
      v-model="activeTab"
      class="tabs"
      mandatory
      color="grey-darken-1"
    >
      <VBtn v-for="tab in tabs" :key="tab.value" @click="navigateTo(tab.path)">
        {{ tab.title }}
      </VBtn>
    </VBtnToggle>
  </div>
</template>
<script setup lang="ts">
import { ETabs } from "~/layers/Portfolio/components/TabsSwitcher/TabsSwitcher.types";

const tabs = computed(() => {
  return [
    {
      path: "/profile",
      title: "Информацио о портфолио",
      value: ETabs.INFO,
    },
    {
      path: "/profile/analytics",
      title: "Аналитика",
      value: ETabs.ANALYTICS,
    },
  ].map((tab, index) =>
    index === activeTab.value
      ? { ...tab, active: true }
      : { ...tab, active: false },
  );
});

const activeTab = ref(0);
</script>

<style scoped>
.tabs-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: var(--gap-xs) 0;
}
</style>
