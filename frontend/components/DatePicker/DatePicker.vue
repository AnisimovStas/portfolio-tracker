<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

const props = defineProps({
  modelValue: {
    default: null,
    type: Date,
  },
});

const emit = defineEmits(["update:model-value", "close"]);

const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:model-value", value);
    emit("close");
  },
});

const attrs = [
  {
    dates: new Date(),
    highlight: {
      class: "!bg-gray-100 dark:!bg-gray-800",
      color: "blue",
      fillMode: "outline",
    },
    key: "today",
  },
];
</script>

<template>
  <VCalendarDatePicker
    v-model="date"
    transparent
    borderless
    :attributes="attrs"
    :is-dark="isDark"
    locale="ru"
    title-position="left"
    trim-weeks
    :first-day-of-week="2"
  />
</template>
