<template>
  <div class="">
    <div class="flex justify-between w-full bg-gray-700">
      <div class="flex items-center justify-start">
        <p
          class="font-bold text-2xl text-white p-2 cursor-pointer"
          @click="navigateHandler"
        >
          Портфолио
        </p>
      </div>
      <Miniprofile />
    </div>
    <slot class="bg-white" />
    <div class="bg-gray-700">футер с инфой</div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";

const authStore = useAuthStore();

const navigateHandler = () =>
  authStore.isAuth ? navigateTo("/profile") : navigateTo("/");
</script>
