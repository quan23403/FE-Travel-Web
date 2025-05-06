<template>
  <v-container class="pa-4">
    <v-card>
      <v-card-title class="text-h5">Lịch sử Đặt Tour</v-card-title>
      <v-divider></v-divider>

      <!-- Lặp qua các booking -->
      <v-card-text>
        <v-row>
          <v-col v-for="booking in bookings" :key="booking.id" cols="12" md="6">
            <v-card>
              <v-img
                :src="
                  booking.thumbnail
                    ? `http://localhost:8080/upload/${booking.thumbnail}`
                    : defaultThumbnail
                "
                height="200px"
              ></v-img>

              <v-card-title>{{ booking.tourName }}</v-card-title>
              <v-card-subtitle>{{ booking.status }}</v-card-subtitle>
              <v-card-text>
                <div>
                  <strong>Tên khách hàng:</strong> {{ booking.userName }}
                </div>
                <div>
                  <strong>Số lượng người tham gia:</strong>
                  {{ booking.numberOfPeople }}
                </div>
                <div>
                  <strong>Phương thức thanh toán:</strong>
                  {{ booking.paymentMethod }}
                </div>
                <div>
                  <strong>Trạng thái thanh toán:</strong>
                  {{ booking.paymentStatus }}
                </div>
                <div>
                  <strong>Ngày khởi hành:</strong> {{ booking.startDate }}
                </div>
                <div><strong>Ngày kết thúc:</strong> {{ booking.endDate }}</div>
                <div>
                  <strong>Giá trị tổng cộng:</strong>
                  {{ formattedTotalPrice(booking.totalPrice) }} VND
                </div>
                <div><strong>Ngày đặt:</strong> {{ booking.bookingDate }}</div>
              </v-card-text>

              <v-card-actions>
                <!-- Kiểm tra nếu ngày startDate đã qua thì hiển thị nút Để lại đánh giá -->
                <v-btn
                  v-if="isBookingPast(booking.startDate)"
                  color="primary"
                  @click="openReviewDialog(booking)"
                >
                  Để lại đánh giá
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Popup Đánh Giá -->
    <v-dialog v-model="showReviewDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Để lại đánh giá</span>
        </v-card-title>
        <v-card-text>
          <v-rating
            half-increments
            hover
            v-model="rating"
            :max="5"
            label="Rating"
            active-color="primary"
          />
          <v-textarea
            v-model="comment"
            label="Nhận xét"
            outlined
            rows="3"
            class="mt-4"
          />
          <v-file-input
            v-model="image"
            multiple
            label="Chọn hình ảnh (tùy chọn)"
            accept="image/*"
            outlined
            class="mt-4"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="submitReview">Gửi Đánh Giá</v-btn>
          <v-btn @click="closeReviewDialog">Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { historyBooking } from "@/api/api";
import { createFeedback } from "@/api/api";
const bookings = ref([]);
const showReviewDialog = ref(false); // Hiển thị dialog đánh giá
const rating = ref(0); // Lưu trữ rating (số sao)
const comment = ref(""); // Lưu trữ nhận xét
const image = ref(null); // Lưu trữ ảnh (có thể tải lên)

onMounted(() => {
  historyBookingFunction();
});

const historyBookingFunction = async () => {
  try {
    const response = await historyBooking();
    bookings.value = response.data.data;
  } catch (error) {
    console.error("Error fetching booking history:", error);
  }
};

const defaultThumbnail = "https://via.placeholder.com/200"; // Default image if thumbnail is empty

// Formatting total price for each booking
const formattedTotalPrice = (totalPrice) => {
  return new Intl.NumberFormat("vi-VN").format(totalPrice);
};

// Hàm kiểm tra xem ngày khởi hành đã qua chưa
const isBookingPast = (startDate) => {
  const currentDate = new Date();
  const start = new Date(startDate);
  return start < currentDate;
};

// Hàm mở dialog để đánh giá
const openReviewDialog = (booking) => {
  console.log("Mở popup đánh giá cho booking với ID:", booking);
  selectedBooking.value = booking; // Lưu thông tin booking vào biến
  showReviewDialog.value = true;
};

// Hàm đóng dialog
const closeReviewDialog = () => {
  showReviewDialog.value = false;
  rating.value = 0;
  comment.value = "";
  image.value = null;
};

const selectedBooking = ref(null); // Lưu thông tin của booking đã chọn

const submitReview = async () => {
  try {
    // Kiểm tra nếu không có booking đã chọn
    if (!selectedBooking.value) {
      console.error("No booking selected");
      return;
    }

    const formData = new FormData();
    formData.append("tourId", selectedBooking.value.tourId); // Sử dụng thông tin tourId từ booking đã chọn
    formData.append("rating", rating.value); // Lưu rating
    formData.append("comment", comment.value); // Lưu comment

    // Nếu có ảnh, thêm ảnh vào FormData
    if (image.value && image.value.length > 0) {
      image.value.forEach((img) => {
        formData.append("images", img); // Thêm từng ảnh vào FormData
      });
    }

    // Gửi yêu cầu API để tạo review
    const response = await createFeedback(formData);

    console.log("Review submitted successfully:", response.data);
    // Sau khi gửi thành công, đóng popup và reset form
    selectedBooking.value = null; // Reset booking đã chọn
    closeReviewDialog();
    alert("Đánh giá đã được gửi thành công!");
  } catch (error) {
    console.error("Error submitting review:", error);
    alert("Đã có lỗi xảy ra khi gửi đánh giá.");
  }
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}

.v-divider {
  margin: 16px 0;
}

.v-btn {
  font-weight: bold;
}

.headline {
  font-weight: bold;
}

.v-dialog .v-btn {
  margin-top: 10px;
}
</style>
