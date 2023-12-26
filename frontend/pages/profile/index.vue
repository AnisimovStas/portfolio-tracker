<template>
  <div>это профиль</div>
</template>

<script setup lang="ts">
import useAuthStore from "~/store/auth.store";

const authStore = useAuthStore();

onBeforeMount(async () => {
  if (authStore.isAuth && !authStore.user) {
    await authStore.getMe();
  }
});
</script>
