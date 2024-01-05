<template>
  <div class="container">
    <div v-if="!portfolioStore.isPortfolioEmpty">
      <GeneralInfo />
      <Actives />
    </div>
    <div v-else class="empty-portfolio">
      <p>Вы еще не создали портфеля, нажмите кнопку создать портфель</p>
      <UButton @click="createPortfolio">Создать портфель</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import GeneralInfo from "~/layers/Portfolio/components/GeneralInfo/GeneralInfo.vue";
import Actives from "~/layers/Portfolio/components/Actives/Actives.vue";
import { usePortfolioStore } from "~/layers/Portfolio/store/Portfolio.store";

const authStore = useAuthStore();
const portfolioStore = usePortfolioStore();

onBeforeMount(async () => {
  if (authStore.isAuth && !authStore.user) {
    await authStore.getMe();
    await portfolioStore.getActives();
  }
});

const createPortfolio = async () => {
  await portfolioStore.createPortfolio();
  await authStore.getMe();
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-s);
  width: 100%;
}

.empty-portfolio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
