<template>
  <div class="page-container p-2 gap-2">
    <ActiveSearchBar />
    <CryptoAddForm v-if="addCurrencyStore.selectedActive?.coinGeckoId" />

    <UButton
      :disabled="!addCurrencyStore.isPayloadFilled"
      @click="addCurrencyStore.addCurrency"
      >Добавить актив</UButton
    >
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import ActiveSearchBar from "~/layers/Portfolio/components/ActiveSearchBar/ActiveSearchBar.vue";
import CryptoAddForm from "~/layers/Portfolio/components/CryptoAddForm/CryptoAddForm.vue";
import { useAddCurrencyStore } from "~/layers/Portfolio/store/addCurrency.store";

const authStore = useAuthStore();
const addCurrencyStore = useAddCurrencyStore();
onBeforeMount(async () => {
  if (authStore.isAuth && !authStore.user) {
    await authStore.getMe();
  }
});
</script>
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
