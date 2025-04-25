<template>
  <v-container>
    <v-stepper v-model="step" editable="true">
      <!-- Header của Stepper -->
      <v-stepper-header>
        <v-stepper-item :complete="step > 1" step="1" title="Thông tin chung" />
        <v-divider />
        <v-stepper-item :complete="step > 2" step="2" title="Thêm hình ảnh" />
        <v-divider />
        <v-stepper-item
          :complete="step > 3"
          step="3"
          title="Lịch trình chi tiết"
        />
        <v-divider />
        <v-stepper-item
          :complete="step > 4"
          step="4"
          title="Câu hỏi thường gặp"
        />
      </v-stepper-header>

      <!-- Nội dung từng bước -->
      <v-stepper-window>
        <!-- Bước 1: Thông tin chung -->
        <v-stepper-window-item :value="0">
          <v-card flat>
            <general-info
              :tourInfo="tour.tourInfo"
              @update:tourInfo="handleTourInfoUpdate"
            />
            <v-stepper-actions @click:next="step++" />
          </v-card>
        </v-stepper-window-item>

        <!-- Bước 2: Thêm hình ảnh -->
        <v-stepper-window-item :value="1">
          <v-card flat>
            <images-tour @sendFiles="handleFileUpload" />
            <v-stepper-actions @click:prev="step--" @click:next="step++" />
          </v-card>
        </v-stepper-window-item>

        <!-- Bước 3: Lịch trình chi tiết -->
        <v-stepper-window-item :value="2">
          <v-card flat>
            <schedule-details
              :itinerary="tour.itinerary"
              @update:itinerary="handleItineraryUpdate"
            />
            <v-stepper-actions @click:prev="step--" @click:next="step++" />
          </v-card>
        </v-stepper-window-item>

        <!-- Bước 4: QnA -->
        <v-stepper-window-item :value="3">
          <v-card flat>
            <qn-a :faq="tour.faq" @update:faq="handleFaqUpdate"></qn-a>
            <div class="custom-actions">
              <v-btn variant="text" @click="step--">PREVIOUS</v-btn>
              <v-btn variant="tonal" @click="submitForm">SUBMIT</v-btn>
            </div>
          </v-card>
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import GeneralInfo from "@/components/AdminPage/TourManagementAdmin/AddTour/GeneralInfo.vue";
import ImagesTour from "@/components/AdminPage/TourManagementAdmin/AddTour/ImagesTour.vue";
import ScheduleDetails from "@/components/AdminPage/TourManagementAdmin/AddTour/ScheduleDetails.vue";
import QnA from "@/components/AdminPage/TourManagementAdmin/AddTour/QnA.vue";
import { uploadImageTours } from "@/api/api";
import { createTour } from "@/api/api";
const step = ref(0);
// Dữ liệu để lưu trữ các tệp đã tải lên
const uploadedFiles = ref([]);
const imagesFile = new FormData(); // Tạo một đối tượng FormData để lưu trữ các tệp đã tải lên
const tour = ref({
  tourInfo: {
    name: "Test",
    startLocation: "Test",
    endLocation: "Test",
    duration: null,
    basePrice: 1000,
    description: null,
    travelType: "Test",
    level: null,
    discount: 10,
    maxGroupSize: 100,
    thumbnail: null,
  },
  images: [],
  itinerary: [],
  faq: [],
});

// Hàm xử lý khi nhận sự kiện update:tourInfo từ component con
const handleTourInfoUpdate = (updatedTourInfo) => {
  console.log("Tour info updated:", updatedTourInfo);
  tour.value.tourInfo = updatedTourInfo;
  console.log("Tour info:", tour.value.tourInfo);
};

const handleItineraryUpdate = (itinerary) => {
  tour.value.itinerary = itinerary;
  console.log("Itinerary info:", tour.value.itinerary);
};

const handleFaqUpdate = (faq) => {
  tour.value.faq = faq;
  console.log("FAQ info:", tour.value.faq);
};
// Hàm xử lý sự kiện 'update:model' từ component con
const handleFileUpload = (files) => {
  uploadedFiles.value = files;
};

// Gửi form
const submitForm = async () => {
  try {
    // Make a POST request using axios to submit the form
    const response = await createTour(tour.value);
    alert("Form submitted successfully!");
    console.log("Form submitted successfully:", response.data);
    await uploadImageFunction(response.data.data.id); // Wait for image upload to complete
  } catch (error) {
    // Handle error
    console.error("There was an error submitting the form:", error);
    alert("Failed to submit the form. Please try again.");
  }
};

const uploadImageFunction = async (tourId) => {
  try {
    const imagesFile = new FormData(); // Create a new FormData object
    imagesFile.append("thumbnailFiles", tour.value.tourInfo.thumbnail); // Append thumbnail to FormData
    for (let i = 0; i < uploadedFiles.value.length; i++) {
      imagesFile.append("detailFiles[]", uploadedFiles.value[i]); // Append each image to FormData
    }
    const response = await uploadImageTours(imagesFile, tourId);
    alert("Images uploaded successfully!");
  } catch (error) {
    console.error("There was an error uploading the images:", error);
    alert("Failed to upload images. Please try again.");
  }
};
</script>

<style scoped>
.custom-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
