<template>
  <v-card-text>
    <v-row>
      <!-- Tên tour -->
      <v-col cols="12">
        <v-text-field v-model="localTourInfo.name" label="Tên tour" required />
      </v-col>

      <!-- Địa điểm xuất phát & Điểm đến -->
      <v-col cols="6">
        <v-text-field
          v-model="localTourInfo.startLocation"
          label="Điểm xuất phát"
          required
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="localTourInfo.endLocation"
          label="Điểm đến"
          required
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
        <v-text-field
          v-model="localTourInfo.travelType"
          label="Loại hình du lịch"
          required
        />
      </v-col>

      <!-- Level (Enum) -->
      <v-col cols="6">
        <v-select
          v-model="localTourInfo.level"
          label="Cấp độ"
          :items="level"
          required
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
  "DURATION_1N0D",
  "DURATION_3N2D",
  "DURATION_4N3D",
  "DURATION_5N4D",
  "DURATION_6N5D",
  "DURATION_7N6D",
  "DURATION_8N7D",
  "DURATION_9N8D",
  "DURATION_10N9D",
  "DURATION_11N10D",
  "DURATION_12N11D",
  "DURATION_13N12D",
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
