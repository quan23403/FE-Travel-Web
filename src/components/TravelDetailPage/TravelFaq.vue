<template>
  <v-container fluid class="faq-container">
    <h1 class="text-h4 text-center mb-8">CÂU HỎI THƯỜNG GẶP (FAQ)</h1>

    <!-- Sử dụng Expansion Panels để hiển thị câu hỏi và câu trả lời -->
    <v-expansion-panels class="faq-panels">
      <v-expansion-panel v-for="(item, index) in faqs" :key="index">
        <v-expansion-panel-title>
          {{ item.question }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-html="item.answer"></div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
import { ref, defineProps } from "vue";
const props = defineProps({
  faqs: {
    type: Array,
    default: () => [],
  },
});
// Dữ liệu câu hỏi thường gặp
</script>

<style scoped>
/* Style cho FAQ */
.text-h4 {
  font-weight: bold;
  color: #2c3e50;
}

.faq-container {
  background-color: #f5f5f5; /* Màu nền xám */
  padding: 20px 0; /* Thêm padding cho background */
}

.faq-panels {
  max-width: 800px; /* Giới hạn chiều rộng của câu hỏi */
  margin: 0 auto; /* Căn giữa các câu hỏi */
}

.v-expansion-panel-title {
  font-weight: bold;
  color: #2c3e50;
}

.v-expansion-panel-text {
  font-size: 16px;
  color: #555;
}
</style>
