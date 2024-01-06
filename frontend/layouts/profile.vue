<template>
  <BaseLayout>
    <TabsSwitcher />
    <slot />
  </BaseLayout>
</template>
<script setup lang="ts">
import TabsSwitcher from "~/layers/Portfolio/components/TabsSwitcher/TabsSwitcher.vue";
import BaseLayout from "~/components/BaseLayout/BaseLayout.vue";
</script>
