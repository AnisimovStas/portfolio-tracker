<template>
  <div class="container">
    <h1>Начало</h1>
    <Icon
      v-if="!authStore.isAuth"
      src="SvgoAuthGoogleIcon"
      @click="
        navigateTo('http://localhost:9229/api/auth/google/login', {
          external: true,
        })
      "
    />
    <button v-else @click="authStore.logout">Выйти из учетной записи</button>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";

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
  align-items: center;
  justify-content: start;
}
</style>
