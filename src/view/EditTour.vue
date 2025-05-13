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
              :schedules="tour.schedules"
              @update:tourInfo="handleTourInfoUpdate"
            />
            <v-stepper-actions @click:next="step++" />
          </v-card>
        </v-stepper-window-item>

        <!-- Bước 2: Thêm hình ảnh -->
        <v-stepper-window-item :value="1">
          <v-card flat>
            <images-tour :images="tour.images" @sendFiles="handleFileUpload" />
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
import { ref, onMounted, defineProps, toRaw } from "vue";
import GeneralInfo from "@/components/AdminPage/TourManagementAdmin/AddTour/GeneralInfo.vue";
import ImagesTour from "@/components/AdminPage/TourManagementAdmin/AddTour/ImagesTour.vue";
import ScheduleDetails from "@/components/AdminPage/TourManagementAdmin/AddTour/ScheduleDetails.vue";
import QnA from "@/components/AdminPage/TourManagementAdmin/AddTour/QnA.vue";
import { uploadImageTours } from "@/api/api";
import { updateTour } from "@/api/api";
import { getTourById } from "@/api/api";
const step = ref(0);
// Dữ liệu để lưu trữ các tệp đã tải lên
const uploadedFiles = ref([]);
const props = defineProps({
  selectedTour: {
    type: Object,
    required: true,
  },
});

const tour = ref({
  tourInfo: {
    name: "",
    startLocation: "",
    endLocation: "",
    duration: "",
    basePrice: "",
    description: "",
    travelType: "",
    level: "",
    discount: "",
    maxGroupSize: "",
    thumbnail: null,
    tags: [],
  },
  schedules: [],
  images: [],
  itinerary: [],
  faq: [],
});
// Hàm để chuyển dữ liệu API vào tour
const setTourData = (data) => {
  tour.value.tourInfo.name = data.name;
  tour.value.tourInfo.startLocation = data.startLocation;
  tour.value.tourInfo.endLocation = data.endLocation;
  tour.value.tourInfo.duration = data.duration;
  tour.value.tourInfo.basePrice = data.basePrice;
  tour.value.tourInfo.description = data.description;
  tour.value.tourInfo.travelType = data.travelType;
  tour.value.tourInfo.level = data.level;
  tour.value.tourInfo.discount = data.discount;
  tour.value.tourInfo.maxGroupSize = data.maxGroupSize;
  tour.value.tourInfo.thumbnail = data.thumbnailUrl;
  tour.value.tourInfo.tags = data.tags.split(",").map(tag => tag.trim());

  // Chuyển các lịch trình vào schedules
  tour.value.schedules = data.schedules.map((schedule) => ({
    id: schedule.id,
    startDate: schedule.startDate,
    endDate: schedule.endDate,
    slot: schedule.slot,
  }));

  // Chuyển các hình ảnh vào images
  tour.value.images = data.imageTours.map((image) => ({
    id: image.id,
    path: image.path,
    imageName: image.imageName,
  }));

  // Chuyển các itineraries vào itinerary
  tour.value.itinerary = data.itineraries.map((itinerary) => ({
    id: itinerary.id,
    dayNumber: itinerary.dayNumber,
    title: itinerary.title,
    description: itinerary.description,
  }));

  // Chuyển các FAQs vào faq
  tour.value.faq = data.faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }));
};

// Gọi hàm để chuyển dữ liệu API vào tour
onMounted(() => {
  console.log(props.selectedTour);
  const tourId = props.selectedTour.id; // Lấy tourId từ props
  getTourByIdFunction(tourId); // Gọi hàm để lấy dữ liệu tour
});

const getTourByIdFunction = async (tourId) => {
  try {
    const response = await getTourById(tourId);
    if (response.status === 200) {
      const tourData = response.data.data;
      setTourData(tourData);
    } else {
      console.error("Error fetching tour data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching tour data:", error);
  }
};
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

const handleFileUpload = (files) => {
  uploadedFiles.value = files;
};

const submitForm = async () => {
  try {
    const response = await updateTour(props.selectedTour.id, tour.value);
    alert("Tour updated successfully!");
    await uploadImageFunction(response.data.data.id);
  } catch (error) {
    console.error("There was an error submitting the form:", error);
    alert("Failed to submit the form. Please try again.");
  }
};

const uploadImageFunction = async (tourId) => {
  try {
    const imagesFile = new FormData();
    imagesFile.append("thumbnailFiles", tour.value.tourInfo.thumbnail);
    for (let i = 0; i < uploadedFiles.value.length; i++) {
      imagesFile.append("detailFiles[]", uploadedFiles.value[i]);
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
