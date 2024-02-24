<template>
  <div class="header__container">
    <GeneralInfo class="header__info" />
    <GeneralGhart />
  </div>
</template>

<script setup lang="ts">
import GeneralInfo from "~/layers/Portfolio/components/GeneralInfo/GeneralInfo.vue";
import GeneralGhart from "~/layers/Portfolio/components/GeneralGhart/GeneralGhart.vue";
</script>
<style scoped>
.header__container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-s);
  width: 100%;
}

.header__info {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  font-size: 20px;
  font-weight: 700;
  border: 1px solid;
}
</style>
