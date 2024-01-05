<template>
  <NuxtLayout :name="activeLayout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();

const activeLayout = computed(() => {
  if (route.path.includes("/profile")) {
    return "profile";
  }

  return "default";
});
</script>

<style>
body {
  font-family: Roboto, sans-serif;
  color: black;
  background: whitesmoke;
}
</style>

<style src="assets/Colors.css" />
<style src="assets/Gaps.css" />
