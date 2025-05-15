<template>
  <v-container class="pa-4">
    <!-- Tiêu đề danh sách tour -->
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">Danh sách Tour</h2>
      </v-col>
    </v-row>

    <!-- Nút Thêm Tour -->
    <v-row>
      <v-col>
        <v-btn color="primary" class="mb-4" @click="goToAddTourPage">
          <v-icon>mdi-plus</v-icon>Thêm Tour</v-btn
        >
      </v-col>
    </v-row>

    <!-- Bảng danh sách tour -->
    <v-data-table
      :headers="headers"
      :items="tours"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.duration }}</td>
          <td>{{ item.startLocation }}</td>
          <td>{{ item.endLocation }}</td>
          <td>{{ item.basePrice }} VNĐ</td>
          <td>{{ item.discount }}%</td>
          <td>
            <!-- Sửa -->
            <v-icon @click="openEditDialog(item)" class="mr-2" color="primary">
              mdi-pencil
            </v-icon>

            <!-- Xóa -->
            <v-icon @click="deleteTour(item.id)" color="red">
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- Popup chỉnh sửa -->
    <v-dialog v-model="editDialog" max-width="80%">
      <v-card>
        <v-card-title class="text-h6">Chỉnh sửa Tour</v-card-title>
        <v-card-text>
          <EditTour :selectedTour="selectedTour" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router"; // Import useRouter để điều hướng
import { getAllTours } from "@/api/api";
import EditTour from "./EditTour.vue";
// Dữ liệu tour (có thể lấy từ API)
const tours = ref([]);
const selectedTour = ref(null);
const editDialog = ref(false);

onMounted(() => {
  // Gọi hàm để lấy danh sách tour từ API khi component được gắn vào DOM
  getAllToursFunction();
});

const getAllToursFunction = () => {
  getAllTours()
    .then((response) => {
      tours.value = response.data.data; // Cập nhật danh sách tour từ API
    })
    .catch((error) => {
      console.error("Lỗi khi lấy danh sách tour:", error);
    });
};
// Cấu hình cột trong bảng
const headers = [
  { title: "Tour ID", align: "start", key: "id" },
  { title: "Tên Tour", align: "start", key: "name" },
  { title: "Thời gian", align: "start", key: "duration" },
  { title: "Khởi hành", align: "start", key: "startLocation" },
  { title: "Kết thúc", align: "start", key: "endLocation" },
  { title: "Giá gốc", align: "start", key: "basePrice" },
  { title: "Giảm giá", align: "start", key: "discount" },
  { title: "Hành động", align: "start" },
];

// Hàm điều hướng tới trang thêm tour
const router = useRouter();
const goToAddTourPage = () => {
  router.push({ name: "addTour" });
};

// Xử lý khi nhấn nút "Xóa"
const deleteTour = (id) => {
  console.log("Xóa tour với ID:", id);
  // Xử lý xóa tour, ví dụ gọi API để xóa hoặc xóa trực tiếp trong mảng
};

const openEditDialog = (tour) => {
  selectedTour.value = { ...tour }; // clone object để tránh sửa trực tiếp
  editDialog.value = true;
};
</script>

<style scoped>
.v-btn {
  margin-right: 8px;
}
</style>
