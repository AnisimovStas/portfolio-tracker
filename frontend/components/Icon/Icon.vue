<template>
  <div id="icon" ref="icon" class="icon-container">
    <component :is="src" class="icon" />
  </div>
</template>
<script setup lang="ts">
import type { IIconProps } from "~/components/Icon/Icon.types";

defineProps<IIconProps>();

const icon = ref(null);

onBeforeMount(() => {
  console.log(icon.value);
  const container = document.getElementById("icon");
  if (container?.children[0]) {
    container.children[0].classList.remove("nuxt-icon--fill");
  }
});
</script>
<style scoped>
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 8px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 50%;
}

.icon-container:hover {
  background-color: #ccc;
}

.icon {
  width: 100%;
  height: 100%;
}
</style>
