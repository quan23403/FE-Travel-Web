<template>
  <v-container class="pa-4">
    <!-- Form đặt tour -->
    <v-card class="pa-4">
      <v-card-title class="text-h5">Đặt Tour</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <div class="d-flex align-center">
              <span class="text-h6">Giá: </span>
              <span class="text-h6 text-decoration-line-through ml-auto">
                {{ formattedOriginalPrice }} đ / Khách
              </span>
            </div>
            <div>
              <span class="text-h4 font-weight-bold red--text ml-2">
                {{ formattedPrice }} đ / Khách
              </span>
            </div>
          </v-col>
        </v-row>
        <!-- Chọn ngày khởi hành từ danh sách -->
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="selectStartDate"
              :items="availableStartDates"
              label="Ngày khởi hành"
              required
              @update:modelValue="updateSlot"
            >
            </v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-select readonly v-model="endDate" label="Ngày kết thúc" required>
            </v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="d-flex align-center">
            <!-- Icon cho địa điểm khởi hành -->
            <v-icon class="mr-2">mdi-map-marker</v-icon>
            <!-- Khởi hành -->
            <span>Khởi hành: {{ travelData.startLocation }}</span>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="d-flex align-center">
            <!-- Icon cho thời gian -->
            <v-icon class="mr-2">mdi-calendar-clock</v-icon>
            <!-- Thời gian -->
            <span>Thời gian: {{ travelData.duration }}</span>
          </v-col>
        </v-row>

        <!-- Hiển thị số lượng slot còn lại -->
        <v-row>
          <v-col cols="12" class="d-flex align-center">
            <v-icon class="mr-2">mdi-seat</v-icon>
            <span>Số chỗ còn: {{ selectedSchedule }}</span>
          </v-col>
        </v-row>

        <!-- Nút đặt ngay -->
        <v-row>
          <v-col cols="12">
            <v-btn
              color="primary"
              block
              :disabled="!selectStartDate || !endDate"
              @click="handleBooking"
            >
              Đặt ngay
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
  <p>{{ selected }}</p>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import router from "@/router";
const endDate = ref(null); // Lưu trữ ngày kết thúc
const selectStartDate = ref(null); // Lưu trữ ngày khởi hành đã chọn
const selectedSchedule = ref(null); // Lưu trữ thông tin schedule tương ứng
const props = defineProps({
  schedules: {
    type: Array,
    required: true,
    default: () => [], // Đảm bảo rằng schedules luôn là mảng
  },
  price: {
    type: Number,
    required: true,
  },
  travelData: {
    type: Object,
    required: true,
  },
});

// Tính toán availableStartDates dựa trên props.schedules
const availableStartDates = computed(() => {
  return Array.isArray(props.schedules)
    ? props.schedules.map((schedule) => schedule.startDate)
    : [];
});

const selected = ref(null); // Lưu trữ thông tin schedule tương ứng
// Cập nhật số lượng slot khi chọn ngày khởi hành
const updateSlot = () => {
  console.log("Selected start date:", selectStartDate.value);
  if (selectStartDate.value) {
    // Tìm kiếm schedule với startDate khớp với selectStartDate
    selected.value = props.schedules.find(
      (schedule) => schedule.startDate === selectStartDate.value
    );

    // Nếu tìm thấy, gán selectedSchedule.value bằng slot của schedule
    if (selected.value) {
      selectedSchedule.value = selected.value.slot;
      endDate.value = selected.value.endDate; // Cập nhật ngày kết thúc
    }
  }
};

// Tính toán giá hiện tại và giá gốc
const formattedPrice = computed(() => {
  return new Intl.NumberFormat("vi-VN").format(props.price);
});

const formattedOriginalPrice = computed(() => {
  return new Intl.NumberFormat("vi-VN").format(props.travelData.basePrice);
});

const handleBooking = () => {
  if (selectStartDate.value && endDate.value) {
    // Truyền dữ liệu qua route params
    router.push({
      name: 'payment', // Tên route thanh toán
      params: {
        scheduleId: selected.value.id, // Truyền scheduleId qua route params
      },
    });
  }
};
</script>

<style scoped>
.text-h6 {
  margin: 0;
}
.v-card {
  max-width: 400px;
  margin: 0 auto;
}
.v-btn {
  font-weight: bold;
  border-radius: 8px;
}
.small-text {
  font-size: 12px; /* Hoặc bạn có thể điều chỉnh theo nhu cầu */
}

.red--text {
  color: red;
}
.text-decoration-line-through {
  text-decoration: line-through;
}

.ml-auto {
  margin-left: auto; /* Đẩy sang tận cùng trái */
}
</style>
