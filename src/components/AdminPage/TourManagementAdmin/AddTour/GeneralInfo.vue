<template>
  <v-card-text>
    <v-row>
      <!-- Tên tour -->
      <v-col cols="12">
        <v-text-field v-model="localTourInfo.name" label="Tên tour" required />
      </v-col>

      <!-- Địa điểm xuất phát & Điểm đến -->
      <v-col cols="6">
        <v-autocomplete
          v-model="localTourInfo.startLocation"
          :items="locations"
          label="Điểm xuất phát"
          clearable
          searchable
          required
        />
      </v-col>

      <v-col cols="6">
        <v-autocomplete
          v-model="localTourInfo.endLocation"
          :items="locations"
          label="Điểm đến"
          required
          clearable
          searchable
        />
      </v-col>

      <!-- Thời gian tour & Giá cơ bản -->
      <v-col cols="6">
        <v-select
          v-model="localTourInfo.duration"
          label="Thời gian (ngày)"
          :items="duration"
          required
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="localTourInfo.basePrice"
          label="Giá cơ bản ($)"
          type="number"
          required
        />
      </v-col>

      <!-- Loại hình du lịch -->
      <v-col cols="12">
        <v-autocomplete
          v-model="localTourInfo.travelType"
          :items="travelTypes"
          label="Loại hình du lịch"
          searchable
          clearable
          required
        />
      </v-col>

      <!-- Level (Enum) -->
      <v-col cols="6">
        <v-select
          v-model="localTourInfo.level"
          label="Cấp độ"
          :items="level"
          clearable
        />
      </v-col>

      <!-- Đánh giá & Giảm giá -->
      <v-col cols="6">
        <v-text-field
          v-model="localTourInfo.discount"
          label="Giảm giá (%)"
          type="number"
          min="0"
          max="100"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          multiple
          v-model="localTourInfo.maxGroupSize"
          label="Số lượng khách"
        />
      </v-col>

      <!-- Mô tả -->
      <v-col cols="12">
        <quill-editor
          v-model:content="localTourInfo.description"
          contentType="html"
          :options="editorOptions"
          :style="{ height: '200px' }"
        />
      </v-col>

      <v-col cols="12">
        <div>
          <v-chip-group multiple column>
            <v-chip
              v-for="(tag, index) in localTourInfo.tags"
              :key="index"
              class="ma-1"
              close
              @click:close="removeTag(index)"
            >
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </div>
      </v-col>

      <!-- Thêm trường tags -->
      <v-col cols="12">
        <v-text-field
          v-model="localTourInfo.tags"
          label="Tags (nhập tags cách nhau bởi dấu phẩy)"
          hint="Ví dụ: biển, núi cao"
          @input="formatTags"
        />
      </v-col>

      <!-- Ảnh thumbnail -->
      <v-col cols="12">
        <v-file-input
          v-model="file"
          label="Chọn ảnh thumbnail"
          accept="image/*"
          @change="onFileChange"
        />
      </v-col>

      <v-col v-if="imageUrl" cols="12">
        <img
          :src="imageUrl"
          alt="Thumbnail"
          style="max-width: 100px; max-height: 100px"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const props = defineProps({
  tourInfo: Object,
});

const file = ref(null);
const emit = defineEmits(["update:tourInfo", "update:schedules"]);
const level = ["EASY", "MEDIUM", "HARD"];
const duration = [
  "DURATION_2N1D",
  "DURATION_3N2D",
  "DURATION_4N3D",
  "DURATION_5N4D",
  "DURATION_6N5D",
  "DURATION_7N6D",
];

const localTourInfo = ref(props.tourInfo);
// Phát sự kiện khi dữ liệu thay đổi để cập nhật lại giá trị trong component cha
watch(
  localTourInfo,
  (newValue) => {
    emit("update:tourInfo", newValue);
  },
  { deep: true }
);

const imageUrl = ref(null);
const onFileChange = () => {
  if (!file.value) {
    imageUrl.value = null;
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    imageUrl.value = reader.result;
  };

  localTourInfo.value.thumbnail = file.value;
  reader.readAsDataURL(file.value);
};

const formatTags = () => {
  // Tách chuỗi tags theo dấu phẩy, loại bỏ khoảng trắng và chuyển thành mảng
  localTourInfo.value.tags = localTourInfo.value.tags.split(","); // Tách chuỗi theo dấu phẩy
};

const locations = [
  "Hà Nội",
  "TP Hồ Chí Minh",
  "Đà Nẵng",
  "Huế",
  "Nha Trang",
  "Sa Pa",
  "Phú Quốc",
  "Cần Thơ",
  "Hạ Long",
  "Đà Lạt",
  "Hội An",
  "Vũng Tàu",
  "Mũi Né",
  "Ninh Bình",
  "Quy Nhơn",
  "Hà Giang",
  "Đồng Nai",
  "Bình Thuận",
  "Gia Lai",
];

const travelTypes = [
  "Trekking",
  "Camping",
  "Cultural",
  "Beach",
  "Relaxation",
  "Family",
  "Business",
  "Romantic",
  "Historical",
];
const editorOptions = {
  theme: "snow",
  modules: {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ align: [] }],
      ["image"],
      ["blockquote", "code-block"],
    ],
  },
};
</script>
