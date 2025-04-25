<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- Màn hình nhập nhiều file ảnh -->
        <v-file-input
          label="Chọn nhiều file ảnh"
          accept="image/*"
          v-model="files"
          outlined
          dense
          multiple
          hide-details
          prepend-icon="mdi-image"
          @change="onFilesChange"
        />
      </v-col>

      <!-- Hiển thị preview của các file ảnh -->
      <v-row v-if="imageUrls.length">
        <v-col v-for="(imageUrl, index) in imageUrls" :key="index" cols="4">
          <v-img
            :src="imageUrl"
            max-width="100%"
            max-height="200"
            contain
          />
          <!-- Nút xóa -->
          <v-btn @click="removeImage(index)" icon color="red">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

const emit = defineEmits(["sendFiles"]); // Định nghĩa sự kiện để gửi file về component cha
const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});
const files = ref([]); // Danh sách các file ảnh được chọn
const imageUrls = ref([]); // Mảng lưu trữ các URL tạm thời của các file ảnh (dùng cho preview)

const onFilesChange = () => {
  if (!files.value || files.value.length === 0) {
    imageUrls.value = []; // Nếu không có file nào được chọn, xóa mảng imageUrls
    return;
  }

  // Kiểm tra xem có file nào không phải là ảnh
  for (const file of files.value) {
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn các file ảnh hợp lệ.");
      return;
    }
  }

  // Tạo FileReader để đọc các file ảnh chỉ để hiển thị preview
  imageUrls.value = []; // Xóa mảng imageUrls trước khi thêm ảnh mới

  // Đọc file ảnh để hiển thị preview
  for (const file of files.value) {
    const reader = new FileReader();

    reader.onload = () => {
      imageUrls.value.push(reader.result); // Đưa URL tạm thời vào imageUrls để preview
    };

    reader.readAsDataURL(file);
  }

  // Phát sự kiện để gửi file về component cha
  emit("sendFiles", files.value);
};

const removeImage = (index) => {
  // Xóa ảnh khỏi mảng imageUrls
  imageUrls.value.splice(index, 1);

  // Xóa ảnh khỏi mảng files
  files.value.splice(index, 1);
};
</script>

<style scoped>
/* Tuỳ chỉnh kiểu dáng nếu cần */
</style>
