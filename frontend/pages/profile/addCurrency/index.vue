<template>
  <div class="page-container p-2 gap-2">
    <ActiveSearchBar />
    <CryptoAddForm
      v-if="addCurrencyStore?.selectedAsset?.type === ACTIVE_TYPE.CRYPTO"
    />

    <UButton :disabled="!addCurrencyStore.isPayloadFilled" @click="addHandler"
      >Добавить актив</UButton
    >
  </div>
</template>
<script setup lang="ts">
import ActiveSearchBar from "~/layers/Portfolio/components/ActiveSearchBar/ActiveSearchBar.vue";
import CryptoAddForm from "~/layers/Portfolio/components/CryptoAddForm/CryptoAddForm.vue";
import { useAddCurrencyStore } from "~/layers/Portfolio/store/addCurrency.store";
import { ACTIVE_TYPE } from "~/types/transaction.types";

const addCurrencyStore = useAddCurrencyStore();

const addHandler = async () => {
  if (!addCurrencyStore.selectedAsset) return;
  if (addCurrencyStore.selectedAsset.type === ACTIVE_TYPE.CRYPTO) {
    await addCurrencyStore.addCrypto();
  }

  navigateTo("/profile");
};
</script>
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
