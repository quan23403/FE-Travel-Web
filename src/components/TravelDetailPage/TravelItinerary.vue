<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(day, index) in itinerary" :key="index">
      <v-expansion-panel-title>
        Ngày {{ day.dayNumber }}: {{ day.title }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div v-html="day.description"></div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { defineProps } from "vue";

// Nhận "itinerary" từ props truyền vào
const props = defineProps({
  itinerary: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* Bạn có thể thêm các style tùy chỉnh ở đây */
</style>
