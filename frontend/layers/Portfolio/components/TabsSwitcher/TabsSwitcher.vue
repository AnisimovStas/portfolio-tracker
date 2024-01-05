<template>
  <div class="tabs-switcher">
    <UTabs v-model="activeTab" :items="tabs" />
  </div>
</template>
<script setup lang="ts">
import { ETabs } from "~/layers/Portfolio/components/TabsSwitcher/TabsSwitcher.types";

const tabs = [
  {
    label: "Информацио о портфолио",
    path: "/profile",
    value: ETabs.INFO,
  },
  {
    label: "Аналитика",
    path: "/profile/analytics",
    value: ETabs.ANALYTICS,
  },
];

const route = useRoute();
const activeTab = computed({
  get() {
    return tabs.findIndex((tab) => tab.path === route.path);
  },
  set(value) {
    navigateTo(tabs[value].path);
  },
});
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
