<template>
  <v-container>
    <!-- Tiêu đề và nút sửa Booking -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title> Booking Tour </v-card-title>
          <!-- Bảng hiển thị danh sách booking -->
          <v-data-table
            :headers="headers"
            :items="bookings"
            item-key="id"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editBooking(item)">
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog sửa booking -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Edit Booking</v-card-title>
        <v-card-text>
          <!-- Form sửa thông tin booking -->
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="User Name"
                v-model="editedBooking.userName"
                disabled
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Tour Name"
                v-model="editedBooking.tourName"
                disabled
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Booking Date"
                v-model="editedBooking.bookingDate"
                disabled
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                label="Status"
                v-model="editedBooking.status"
                :items="statusOptions"
                dense
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" @click="confirmChange">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getAllBookings } from "@/api/api";
import { updatedBooking } from "@/api/api";

// Khởi tạo dữ liệu ban đầu theo input đã cho
const bookings = ref([]);

// Lấy danh sách booking từ API
const getAllBookingsFunction = async () => {
  try {
    const response = await getAllBookings();
    bookings.value = response.data.data.map((item) => ({
      ...item,
      createdAt: formatDate(item.createdAt),
      updatedAt: formatDate(item.updatedAt),
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

getAllBookingsFunction();

// Định nghĩa headers cho bảng hiển thị
const headers = [
  { title: "ID", value: "id" },
  { title: "User Name", value: "userName" },
  { title: "Tour Name", value: "tourName" },
  { title: "Booking Date", value: "bookingDate" },
  { title: "Total Price", value: "totalPrice" },
  { title: "Number of People", value: "numberOfPeople" },
  { title: "Created At", value: "createdAt" },
  { title: "Updated At", value: "updatedAt" },
  { title: "Status", value: "status" },
  { title: "Actions", value: "actions", sortable: false },
];

// Các tùy chọn trạng thái
const statusOptions = ["PENDING", "CONFIRMED", "CANCELLED"];

// Các biến reactive quản lý dialog và dữ liệu booking được chỉnh sửa
const dialog = ref(false);

// Dữ liệu booking dùng cho form (sử dụng reactive để có tính gắn liền với các input)
const editedBooking = reactive({
  id: null,
  userName: "",
  tourName: "",
  bookingDate: "",
  status: "",
  totalPrice: 0,
  numberOfPeople: 0,
  createdAt: "",
  updatedAt: "",
});

// Mở dialog chỉnh sửa booking
function editBooking(item) {
  Object.assign(editedBooking, item);
  dialog.value = true;
}

// Đóng dialog
function closeDialog() {
  dialog.value = false;
}

// Xác nhận thay đổi status
function confirmChange() {
  // Xác nhận thay đổi status trước khi lưu
  if (window.confirm("Bạn có chắc muốn thay đổi trạng thái này?")) {
    saveBooking();
  }
}

// Lưu booking (cập nhật)
function saveBooking() {
  updatedBooking(editedBooking.id, {
    ...editedBooking,
  })
    .then(() => {
      getAllBookingsFunction(); // Cập nhật danh sách booking sau khi lưu
      closeDialog(); // Đóng dialog sau khi lưu
    })
    .catch((error) => {
      console.error("Error updating booking:", error);
    });
}

// Hàm định dạng ngày tháng theo yêu cầu
function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", options).format(date);
}
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
