<template>
  <div id="icon" class="icon-container">
    <component :is="src" class="icon" />
  </div>
</template>
<script setup lang="ts">
import type { IIconProps } from "~/components/Icon/Icon.types";

const props = defineProps<IIconProps>();

const iconSize = computed(() => {
  switch (props.size) {
    case "xs":
      return "24px";
    case "sm":
      return "32px";
    case "md":
      return "48px";
    case "lg":
      return "64px";
    case "xl":
      return "96px";
  }
});
// Убирает черный цвет
// onBeforeMount(() => {
//   const container = document.getElementById("icon");
//   if (container?.children[0]) {
//     container.children[0].classList.remove("nuxt-icon--fill");
//   }
// });
</script>
<style scoped>
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: v-bind(iconSize);
  height: v-bind(iconSize);
  padding: 8px;
  cursor: pointer;
  background: var(--black);
  border: 2px solid var(--white);
  border-radius: 50%;
}

.icon-container:hover {
  color: var(--black);
  background: var(--white);
}

.icon {
  width: 100%;
  height: 100%;
}
</style>
