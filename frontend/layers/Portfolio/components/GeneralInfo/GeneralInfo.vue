<template>
  <div class="container">
    <div class="general__info">Блок с информацией о портфеле</div>
    <div class="general__chart">График портфеля</div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-s);
  width: 100%;
}

.general__info {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  font-size: 20px;
  font-weight: 700;
  border: 1px solid;
}

.general__chart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  border: 1px solid;
}
</style>
