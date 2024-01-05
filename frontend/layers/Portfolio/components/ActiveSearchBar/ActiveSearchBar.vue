<template>
  <div class="active__searchbar">
    <!--    <v-combobox-->
    <!--      :model-value="activeName"-->
    <!--      :items="actives"-->
    <!--      :loading="loading"-->
    <!--      no-filter-->
    <!--      label="Найти актив"-->
    <!--      clearable-->
    <!--      @update:model-value="$emit('update:activeName', $event)"-->
    <!--    ></v-combobox>-->
  </div>
</template>
<script setup lang="ts">
import type {
  IActiveSearchBarEmits,
  IActiveSearchBarProps,
} from "~/layers/Portfolio/components/ActiveSearchBar/ActiveSearchBar.types";

defineProps<IActiveSearchBarProps>();
defineEmits<IActiveSearchBarEmits>();
</script>

<style scoped>
.active__searchbar {
  width: 300px;
}
</style>
