<template>
  <v-card class="mb-4">
    <v-card-title>Reviews</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(review, index) in props.reviews" :key="index">
          <!-- Tên người dùng (author) -->
          <v-list-item-title>{{ review.userName }}</v-list-item-title>

          <!-- Rating -->
          <v-rating
            :model-value="review.rating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <!-- Bình luận (comment) -->
          <v-list-item-subtitle>{{ review.comment }}</v-list-item-subtitle>

          <!-- Hiển thị Hình ảnh (nếu có) -->
          <div
            v-if="review.images && review.images.length"
            class="image-gallery"
          >
            <!-- Lặp qua các ảnh -->
            <div
              v-for="(image, idx) in review.images"
              :key="idx"
              class="image-container"
            >
              <img
                :src="'http://localhost:8080/upload/' + image"
                alt="Review Image"
                class="review-image"
              />
            </div>
          </div>

          <!-- Thời gian tạo review -->
          <v-list-item-subtitle
            class="mt-2"
            style="font-size: 12px; color: gray"
          >
            {{ new Date(review.createdAt).toLocaleString() }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";

// Dữ liệu nhận từ API
const props = defineProps({
  reviews: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* Sử dụng Flexbox để sắp xếp ảnh theo hàng ngang và căn giữa */
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center; /* Căn giữa các ảnh theo chiều dọc */
}

/* Mỗi ảnh có padding nhỏ */
.image-container {
  padding: 4px;
}

/* Đảm bảo ảnh không bị mờ hoặc biến dạng */
.review-image {
  width: 100%;
  height: auto;
  max-width: 120px; /* Giới hạn kích thước ảnh tối đa */
  object-fit: cover; /* Đảm bảo ảnh không bị vỡ tỷ lệ */
}
</style>
