<template>
  <v-container>
    <h1 class="text-h4 text-center mb-8">Bạn Có Thể Thích</h1>
    <v-row>
      <!-- Lặp qua các tour liên quan và hiển thị dưới dạng Vuetify Card -->
      <v-col v-for="tour in relatedTours" :key="tour.id" cols="12" md="4">
        <v-card
          class="tour-card"
          outlined
          @click="goToDetail(tour.id)"
          style="height: 80vh; display: flex; flex-direction: column"
        >
          <v-img
            :src="
              tour.thumbnail
                ? getThumbnailUrl(tour.thumbnail)
                : 'https://via.placeholder.com/200'
            "
            height="200"
            width="100%"
            style="object-fit: cover"
          ></v-img>

          <!-- Card Content -->
          <v-card-title>
            <v-row>
              <v-col cols="12" class="text-h6 name-wrap">
                {{ tour.name }}
              </v-col>
              <v-col cols="12" class="text-subtitle-2">
                <v-icon>mdi-clock</v-icon> {{ tour.duration }} |
                <v-icon>mdi-map</v-icon> {{ tour.level }}
              </v-col>
            </v-row>
          </v-card-title>

          <!-- Start and End Locations -->
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <strong>Start:</strong> {{ tour.startLocation }}
              </v-col>
              <v-col cols="6">
                <strong>End:</strong> {{ tour.endLocation }}
              </v-col>
            </v-row>

            <!-- Price and Description -->
            <v-row>
              <v-col cols="8" class="text-h5 font-weight-bold text-red">
                <span v-if="tour.discount > 0" class="original-price">
                  {{ formatPrice(tour.basePrice) }}
                </span>
                <span style="display: block">{{
                  formatPrice(getDiscountedPrice(tour.basePrice, tour.discount))
                }}</span>
              </v-col>

              <!-- Display Discount Tag -->
              <v-col v-if="tour.discount > 0" cols="4">
                <v-chip color="red" text-color="white">
                  -{{ tour.discount }}%
                </v-chip>
              </v-col>
            </v-row>
            <div
              v-html="getShortDescription(tour.description)"
              class="description-ellipsis"
            ></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps } from "vue";
import router from "@/router";

// Nhận props relatedTours từ component cha
const props = defineProps({
  relatedTours: {
    type: Array,
    required: true,
  },
});

// Hàm điều hướng đến trang chi tiết của tour khi người dùng click vào
const goToDetail = (id) => {
  router.push(`/tour/${id}`);
};

// Hàm format giá
const formatPrice = (price) => {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

// Hàm tính giá sau khi giảm giá
const getDiscountedPrice = (basePrice, discount) => {
  return basePrice - (basePrice * discount) / 100;
};

const getShortDescription = (description) => {
  const maxLength = 100; // Số ký tự muốn hiển thị
  if (!description) return ""; // Nếu không có mô tả, trả về chuỗi rỗng

  // Cắt chuỗi đến vị trí maxLength
  let shortDescription = description.slice(0, maxLength);

  // Nếu phần tử bị cắt giữa chừng, tìm khoảng trắng gần nhất để không cắt giữa từ
  if (shortDescription.length === maxLength) {
    shortDescription =
      shortDescription.substring(0, shortDescription.lastIndexOf(" ")) +
      " [....]";
  }

  return shortDescription;
};

const getThumbnailUrl = (thumbnailPath) => {
  return `http://localhost:8080/upload/${thumbnailPath}`;
};
</script>

<style scoped>
.text-h4 {
  font-weight: bold;
  color: #2c3e50;
}

/* Các style tùy chỉnh */
.tour-card {
  display: flex;
  flex-direction: column;
  height: 100%; /* Đảm bảo thẻ card có chiều cao đầy đủ */
}
.v-card-title {
  font-weight: bold;
  font-size: 22px;
}
.description-ellipsis {
  text-align: justify;
  display: block;
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  word-wrap: break-word;
  box-sizing: border-box;
}
.original-price {
  text-decoration: line-through;
  color: gray;
}

.name-wrap {
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-row {
  margin-bottom: 5px;
}
</style>
