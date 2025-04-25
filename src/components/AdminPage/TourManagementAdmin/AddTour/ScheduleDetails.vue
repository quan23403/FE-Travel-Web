<template>
  <v-card-text>
    <v-btn color="primary" @click="addSchedule">+ Thêm ngày</v-btn>
    <div class="overflow-container">
      <v-row
        v-for="(schedule, index) in localItinerary"
        :key="index"
        class="mt-2"
        align="start"
      >
        <v-text-field
          v-model="schedule.title"
          :label="'TIÊU ĐỀ NGÀY ' + schedule.dayNumber"
          required
        />

        <!-- Hoạt động -->
        <v-col :cols="12">
          <!-- Quill Editor -->
          <quill-editor
            v-model:content="schedule.description"
            contentType="html"
            :options="editorOptions"
            :style="{ height: '200px' }"
          />
        </v-col>

        <v-col :cols="12" class="justify-center align-center">
          <!-- Xóa ngày -->
          <v-btn variant="outlined" color="red" @click="removeSchedule(index)">
            Remove
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-card-text>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const props = defineProps({
  itinerary: {
    type: Array,
    default: () => [], // Mảng mặc định nếu không có giá trị từ cha
  },
});

const emit = defineEmits(["update:itinerary"]);

const localItinerary = ref([...props.itinerary]);

// Thêm lịch trình mới
const addSchedule = () => {
  const scheduleLength = localItinerary.value ? localItinerary.value.length : 0;
  localItinerary.value.push({
    dayNumber: scheduleLength + 1, // Lưu dưới dạng số
    title: "",
    description: "",
  });
};

// Xóa một ngày khỏi lịch trình
const removeSchedule = (index) => {
  if (localItinerary.value && localItinerary.value.length > 0) {
    localItinerary.value.splice(index, 1); // Xóa ngày được chọn

    // Cập nhật lại số thứ tự sau khi xóa
    localItinerary.value.forEach((item, i) => {
      item.dayNumber = i + 1; // Cập nhật lại dayNumber
    });
  }
};

// Watch để cập nhật lại itinerary mỗi khi localTour thay đổi
watch(
  localItinerary,
  (newVal) => {
    emit("update:itinerary", newVal);
  },
  { deep: true }
);

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

<style scoped>
/* Container to hold the scrollable content, with dynamic height */
.overflow-container {
  max-height: 60vh; /* Use 60% of the viewport height */
  overflow-y: auto; /* Enable vertical scrolling when content exceeds the container's height */
  padding-right: 16px; /* Optional: Adds a right padding to compensate for scrollbar width */
  box-sizing: border-box; /* To ensure padding doesn't cause overflow */
}

/* Ensure Quill Editor doesn't overflow */
.v-quill-editor {
  max-width: 100%;
  box-sizing: border-box;
}
</style>
