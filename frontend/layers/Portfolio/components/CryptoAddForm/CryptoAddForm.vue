<template>
  <div class="crypto-form__container">
    <!--    <v-text-field-->
    <!--      label="Количество"-->
    <!--      :model-value="amount"-->
    <!--      type="number"-->
    <!--      @update:model-value="$emit('update:amount', $event)"-->
    <!--    />-->

    <!--    <v-container>-->
    <!--      <v-row justify="space-around">-->
    <!--        <v-date-picker elevation="24"></v-date-picker>-->
    <!--      </v-row>-->
    <!--    </v-container>-->
    <!--    <v-checkbox v-model="isStacking" label="Стейкинг?" />-->
    <!--    <v-text-field-->
    <!--      v-if="isStacking"-->
    <!--      label="Проценты стейкинга"-->
    <!--      type="number"-->
    <!--      :model-value="stackingPercentage"-->
    <!--      @update:model-value="$emit('update:stackingPercentage', $event)"-->
    <!--    />-->
  </div>
</template>
<script setup lang="ts">
import type {
  ICryptoAddFormEmits,
  ICryptoAddFormProps,
} from "~/layers/Portfolio/components/CryptoAddForm/CryptoAddForm.types";

defineProps<ICryptoAddFormProps>();
defineEmits<ICryptoAddFormEmits>();

const isStacking = ref<boolean>(false);
</script>
<style scoped>
.crypto-form__container {
  display: flex;
  flex-direction: column;
}
</style>
