<template>
  <div class="container">
    <GeneralInfo />
    <Actives />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import GeneralInfo from "~/layers/Portfolio/components/GeneralInfo/GeneralInfo.vue";
import Actives from "~/layers/Portfolio/components/Actives/Actives.vue";

const authStore = useAuthStore();

onBeforeMount(async () => {
  if (authStore.isAuth && !authStore.user) {
    await authStore.getMe();
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-s);
  width: 100%;
}
</style>
