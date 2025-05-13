<template>
  <v-container class="my-16">
    <!-- Title -->
    <h1 class="text-h3 text-center mb-8">FAVORITE DESTINATION</h1>

    <!-- Filter Section -->
    <v-row class="mb-4" justify="center">
      <v-col cols="12" md="3">
        <v-text-field
          v-model="searchQuery"
          label="Search by destination"
          prepend-icon="mdi-magnify"
          clearable
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedStartLocation"
          :items="locations"
          label="Start Location"
          clearable
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedEndLocation"
          :items="locations"
          label="End Location"
          clearable
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="slide-x-reverse-transition"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="selectedDate"
              label="Select Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="selectedDate"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="destination in paginatedDestinations"
        :key="destination.id"
        cols="12"
        md="4"
        lg="4"
      >
        <v-card
          class="tour-card"
          outlined
          @click="goToDetail(destination.id)"
          style="height: 80vh; display: flex; flex-direction: column"
        >
          <v-img
            :src="
              destination.thumbnail
                ? getThumbnailUrl(destination.thumbnail)
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
                {{ destination.name }}
              </v-col>
              <v-col cols="12" class="text-subtitle-2">
                <v-icon>mdi-clock</v-icon> {{ destination.duration }} |
                <v-icon>mdi-map</v-icon> {{ destination.level }}
              </v-col>
            </v-row>
          </v-card-title>

          <!-- Start and End Locations -->
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <strong>Start:</strong> {{ destination.startLocation }}
              </v-col>
              <v-col cols="6">
                <strong>End:</strong> {{ destination.endLocation }}
              </v-col>
            </v-row>

            <!-- Price and Description -->
            <v-row>
              <v-col cols="8" class="text-h5 font-weight-bold text-red">
                <span v-if="destination.discount > 0" class="original-price">
                  {{ formatPrice(destination.basePrice) }}
                </span>
                <span style="display: block">{{
                  formatPrice(
                    getDiscountedPrice(
                      destination.basePrice,
                      destination.discount
                    )
                  )
                }}</span>
              </v-col>

              <!-- Display Discount Tag -->
              <v-col v-if="destination.discount > 0" cols="4">
                <v-chip color="red" text-color="white">
                  -{{ destination.discount }}%
                </v-chip>
              </v-col>
            </v-row>
            <div
              v-html="getShortDescription(destination.description)"
              class="description-ellipsis"
            ></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Pagination -->
    <v-row justify="center">
      <v-col cols="auto">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :items-per-page="itemsPerPage"
          :total-visible="7"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import router from "@/router";
import { getAllTours } from "@/api/api";

// Data of destinations
const destinations = ref([]);
const searchQuery = ref("");
const selectedStartLocation = ref(null);
const selectedEndLocation = ref(null);
const selectedDate = ref(null);
const menu = ref(false);

const currentPage = ref(1);
const itemsPerPage = ref(6);

const locations = ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hue"];

// Fetch data from API
const fetchDestinations = async () => {
  try {
    const response = await getAllTours();
    destinations.value = response.data.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
  }
};

// Method to get the complete URL for the thumbnail
const getThumbnailUrl = (thumbnailPath) => {
  return `http://localhost:8080/upload/${thumbnailPath}`; // Giả sử server đang chạy trên cổng 8080
};

// Format price to currency format
const formatPrice = (price) => {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

// Calculate price after discount
const getDiscountedPrice = (basePrice, discount) => {
  return basePrice - (basePrice * discount) / 100;
};

// Method to go to tour detail page
const goToDetail = (id) => {
  router.push(`/tour/${id}`);
};

// Filter destinations based on search query and selected filters
const filteredDestinations = computed(() => {
  return destinations.value.filter((destination) => {
    const matchesSearch = destination.name
      .toLowerCase()
      .includes((searchQuery.value || "").toLowerCase());
    const matchesStartLocation =
      !selectedStartLocation.value ||
      destination.startLocation === selectedStartLocation.value;
    const matchesEndLocation =
      !selectedEndLocation.value ||
      destination.endLocation === selectedEndLocation.value;
    const matchesDate =
      !selectedDate.value || destination.date === selectedDate.value;
    return (
      matchesSearch && matchesStartLocation && matchesEndLocation && matchesDate
    );
  });
});

// Calculate paginated destinations based on current page and items per page
const paginatedDestinations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredDestinations.value.slice(start, end);
});

// Total pages calculation
const totalPages = computed(() => {
  return Math.ceil(filteredDestinations.value.length / itemsPerPage.value);
});

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

onMounted(() => {
  fetchDestinations();
});
</script>

<style scoped>
.v-btn {
  font-weight: bold;
  border-radius: 8px;
}

.v-card-title {
  font-weight: bold;
  font-size: 22px;
}

.v-row {
  margin-bottom: 5px;
}

.name-wrap {
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
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

.tour-card {
  display: flex;
  flex-direction: column;
  height: 100%; /* Đảm bảo thẻ card có chiều cao đầy đủ */
}
</style>
