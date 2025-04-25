<template>
  <div class="travel-header">
    <!-- Title Section -->
    <v-container class="text-center py-8">
      <h1 class="text-h4 font-weight-bold primary--text">{{ title }}</h1>
      <div class="text-h6 text-uppercase font-weight-medium mt-2">
        CẤP ĐỘ - {{ level }}
      </div>
    </v-container>

    <!-- Carousel -->
    <v-container>
      <v-carousel
        v-if="fullImages.length > 0"
        cycle
        height="60vh"
        hide-delimiter-background
        show-arrows-on-hover
        :interval="5000"
      >
        <v-carousel-item
          v-for="(image, i) in fullImages"
          :key="i"
          style="object-fit: cover"
        >
          <!-- Sử dụng lazy-load để chỉ tải ảnh khi cần thiết -->
          <v-img
            :src="image"
            aspect-ratio="16/9"
            contain
            alt="Image"
            lazy
          ></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const baseUrl = "http://localhost:8080/upload/"; // Base URL cho hình ảnh

// Define props cho title, description, và images
const props = defineProps({
  title: String,
  description: String,
  level: String,
  detailImages: {
    type: Array,
    default: () => [], // Mảng mặc định là rỗng
  },
});

// Computed property để chuyển đổi path thành URL đầy đủ
const fullImages = computed(() => {
  console.log("Detail Images: ", props.detailImages);
  return props.detailImages.map((image) => `${baseUrl}${image.path}`);
});
</script>

<style scoped>
.travel-header {
  background-color: #f5f5f5;
}

.v-carousel {
  border-radius: 8px;
  overflow: hidden;
}
</style>
