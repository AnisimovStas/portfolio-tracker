<template>
  <div class="container">
    <div class="header">
      <div class="header--left-size">
        <p class="header--logo" @click="navigateTo('/')">Портфолио</p>
      </div>
      <Miniprofile />
    </div>

    <slot class="slot" />
    <div class="footer">футер с инфой</div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  min-height: 100%;
  padding: 10px;
  background: var(--black);
}

.header--left-size {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 70px;
}

.header--logo {
  font-size: 24px;
  font-weight: 700;
  color: var(--white);
  cursor: pointer;
}

.slot {
  display: flex;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  color: var(--white);
  background: var(--black);
}
</style>
