<template>
  <NuxtLayout :name="activeLayout">
    <NuxtPage class="bg-gray-900 min-h-screen" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();

const activeLayout = computed(() => {
  if (route.path.includes("/profile") && !route.path.includes("/addCurrency")) {
    return "profile";
  }

  return "default";
});
</script>

<style>
body {
  font-family: Roboto, sans-serif;
  background: whitesmoke;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  margin: 0;
  appearance: none;
}

/* Firefox */
input[type="number"] {
  appearance: textfield;
}
</style>

<style src="assets/Colors.css" />
<style src="assets/Gaps.css" />
