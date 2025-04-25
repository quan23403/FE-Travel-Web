<template>
  <v-container>
    <!-- Tiêu đề và nút thêm Booking -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Booking Tour
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openDialog('create')">
              Thêm Booking
            </v-btn>
          </v-card-title>
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
              <v-icon small @click="deleteBooking(item.id)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog dùng chung cho cả Tạo và Cập nhật booking -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ dialogMode === "create" ? "Thêm Booking" : "Chỉnh Sửa Booking" }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- User Name -->
              <v-col cols="12" sm="6">
                <v-text-field
                  label="User Name"
                  v-model="editedBooking.userName"
                ></v-text-field>
              </v-col>
              <!-- Tour Name -->
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Tour Name"
                  v-model="editedBooking.tourName"
                ></v-text-field>
              </v-col>
              <!-- Booking Date -->
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Booking Date"
                  v-model="editedBooking.bookingDate"
                  type="date"
                ></v-text-field>
              </v-col>
              <!-- Status -->
              <v-col cols="12" sm="6">
                <v-select
                  :items="statusOptions"
                  label="Status"
                  v-model="editedBooking.status"
                ></v-select>
              </v-col>
              <!-- Total Price -->
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Total Price"
                  v-model="editedBooking.totalPrice"
                  type="number"
                ></v-text-field>
              </v-col>
              <!-- Number of People -->
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Number of People"
                  v-model="editedBooking.numberOfPeople"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" text @click="saveBooking">
            {{ dialogMode === "create" ? "Thêm" : "Cập Nhật" }}
          </v-btn>
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

const updateBookingFunction = async (id, data) => {
  try {
    const response = await updatedBooking(id, data);
    if (response.status === 200) {
      // Cập nhật lại danh sách booking sau khi cập nhật thành công
      await getAllBookingsFunction();
    }
  } catch (error) {
    console.error("Error updating booking:", error);
  }
};

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
const dialogMode = ref("create"); // 'create' hay 'edit'

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

// Mở dialog, nếu là tạo mới thì reset dữ liệu
function openDialog(mode) {
  dialogMode.value = mode;
  if (mode === "create") {
    editedBooking.id = null;
    editedBooking.userName = "";
    editedBooking.tourName = "";
    editedBooking.bookingDate = "";
    editedBooking.status = "";
    editedBooking.totalPrice = 0;
    editedBooking.numberOfPeople = 0;
    editedBooking.createdAt = "";
    editedBooking.updatedAt = "";
  }
  dialog.value = true;
}

// Đóng dialog
function closeDialog() {
  dialog.value = false;
}

// Lưu booking (tạo mới hoặc cập nhật)
function saveBooking() {
  if (dialogMode.value === "create") {
    // Tạo một booking mới, gán ID mới (ở đây dùng Date.now() làm ví dụ)
    const newBooking = {
      ...editedBooking,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    bookings.value.push(newBooking);
  } else {
    updateBookingFunction(editedBooking.id, {
      ...editedBooking,
    });
  }
  closeDialog();
}

// Hàm để chỉnh sửa booking: hiển thị dialog với dữ liệu được load sẵn
function editBooking(item) {
  dialogMode.value = "edit";
  Object.assign(editedBooking, item);
  dialog.value = true;
}

// Hàm để xoá booking
function deleteBooking(id) {
  bookings.value = bookings.value.filter((b) => b.id !== id);
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
