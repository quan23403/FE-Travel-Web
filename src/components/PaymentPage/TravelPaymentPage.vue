<template>
  <v-container class="pa-4">
    <v-card class="pa-4">
      <v-card-title class="text-h5">Thanh Toán</v-card-title>
      <v-card-text>
        <!-- Chia màn hình thành 2 cột -->
        <v-row>
          <v-col cols="12" md="8">
            <!-- Form nhập thông tin liên lạc -->
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Tên khách hàng"
                  v-model="customerName"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email" v-model="customerEmail" required />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Số điện thoại"
                  v-model="customerPhone"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Địa chỉ"
                  v-model="customerAddress"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="numberPeople"
                  :max="travelData.slot"
                  type="number"
                  label="Nhập số người tham gia"
                  min="1"
                  required
                />
                <span v-if="numberPeople > travelData.slot" style="color: red">
                  Số người tham gia không thể lớn hơn số chỗ còn lại!
                </span>
              </v-col>
            </v-row>

            <!-- Phương thức thanh toán -->
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="paymentMethod"
                  :items="paymentMethods"
                  label="Chọn phương thức thanh toán"
                  required
                />
              </v-col>
            </v-row>

            <!-- Nút thanh toán -->
            <v-row>
              <v-col cols="12">
                <v-btn color="primary" block @click="handlePayment"
                  >Thanh toán</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="12" class="d-flex flex-column align-center">
                <!-- Hiển thị thumbnail image -->
                <v-img
                  :src="
                    'http://localhost:8080/upload/' + travelData.thumbnailUrl
                  "
                  class="mr-3"
                  height="200px"
                  width="100%"
                  contain
                ></v-img>
              </v-col>
              <v-col cols="12">
                <div><strong>Tên tour:</strong> {{ travelData.tourName }}</div>
              </v-col>
              <v-col cols="12">
                <div>
                  <strong>Khởi hành:</strong> {{ travelData.startLocation }}
                </div>
              </v-col>
              <v-col cols="12">
                <div>
                  <strong>Ngày khởi hành:</strong> {{ travelData.startDate }}
                </div>
              </v-col>
              <v-col cols="12">
                <div>
                  <strong>Ngày kết thúc:</strong> {{ travelData.endDate }}
                </div>
              </v-col>
              <v-col cols="12">
                <div>
                  <strong>Số chỗ còn lại:</strong> {{ travelData.slot }}
                </div>
              </v-col>
            </v-row>

            <!-- Hiển thị tổng tiền thanh toán -->
            <v-row>
              <v-col cols="12">
                <div>
                  <strong>Tổng tiền thanh toán:</strong>
                  {{ formattedTotalPrice }} VNĐ
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { getScheduleById } from "@/api/api";

const route = useRoute();
const travelData = ref({});
const numberPeople = ref(1); // Số lượng người tham gia

onMounted(() => {
  getScheduleByIdFunction(route.params.scheduleId);
});

const getScheduleByIdFunction = async (scheduleId) => {
  try {
    const response = await getScheduleById(scheduleId);
    if (response && response.data) {
      travelData.value = response.data.data; // Assuming the API returns the data in this format
      console.log("Tour details fetched successfully:", travelData.value);
    } else {
      console.error("No data found for the given tour ID.");
    }
  } catch (error) {
    console.error("Error fetching tour details:", error);
  }
};

const paymentMethods = ["Thẻ tín dụng", "PayPal", "Chuyển khoản ngân hàng"];

// Tính toán tổng tiền thanh toán
const formattedTotalPrice = computed(() => {
  return new Intl.NumberFormat("vi-VN").format(
    travelData.value.basePrice * (1 - travelData.value.discount / 100)
  );
});

// Xử lý thanh toán
const handlePayment = () => {
  console.log("Thanh toán thành công với thông tin: ", {});
};
</script>

<style scoped>
.v-card {
  max-width: 1000px;
  margin: 0 auto;
}

.text-h6 {
  margin: 0;
}

.text-h5 {
  font-weight: bold;
}

.text-h4 {
  font-weight: bold;
  font-size: 1.25rem;
}

.v-btn {
  font-weight: bold;
  border-radius: 8px;
}

@media (max-width: 600px) {
  .v-card {
    max-width: 100%;
  }
}
</style>
