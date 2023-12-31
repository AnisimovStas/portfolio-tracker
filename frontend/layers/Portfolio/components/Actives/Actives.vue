<template>
  <div class="container">
    <div class="actives__header">
      <div class="header__title">Хеддер блока с активами</div>
      <v-btn @click="navigateTo('/profile/addCurrency')">Добавить актив</v-btn>
    </div>
    <div class="active__block">Блок с криптовалютами</div>
    <div class="active__block">Блок с ру акциями</div>
    <div class="active__block">Блок с ру облигациями</div>
    <div class="active__block">Блок с фондами</div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-s);
  width: 100%;
  border: 1px solid;
}

.actives__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
}

.header__title {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}

.active__block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  border: 1px solid;
}
</style>
