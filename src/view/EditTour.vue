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
            <images-tour 
            :images="tour.images"
            @sendFiles="handleFileUpload" />
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
import { ref, onMounted } from "vue";
import GeneralInfo from "@/components/AdminPage/TourManagementAdmin/AddTour/GeneralInfo.vue";
import ImagesTour from "@/components/AdminPage/TourManagementAdmin/AddTour/ImagesTour.vue";
import ScheduleDetails from "@/components/AdminPage/TourManagementAdmin/AddTour/ScheduleDetails.vue";
import QnA from "@/components/AdminPage/TourManagementAdmin/AddTour/QnA.vue";
import { uploadImageTours } from "@/api/api";
import { createTour } from "@/api/api";
const step = ref(0);
// Dữ liệu để lưu trữ các tệp đã tải lên
const uploadedFiles = ref([]);
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

// Giả sử bạn đã nhận được response từ API
const apiResponse = {
  status: "success",
  message: "Tour found",
  data: {
    id: 20,
    name: "Test",
    startLocation: "Test",
    endLocation: "Test",
    thumbnailUrl: "thumbnails/HoangMinhQuan.jpg",
    duration: "DURATION_3N2D",
    basePrice: 1000.0,
    description: "<p>AA</p>",
    travelType: "Test",
    level: "MEDIUM",
    status: null,
    rating: null,
    discount: 10.0,
    maxGroupSize: 100,
    createdAt: "2025-04-06T23:34:06.578522",
    updatedAt: "2025-04-06T23:34:07.875957",
    createdBy: null,
    updatedBy: null,
    schedules: [
      {
        id: 40,
        startDate: "2025-04-09",
        endDate: "2025-04-12",
        slot: 100,
      },
      {
        id: 41,
        startDate: "2025-04-10",
        endDate: "2025-04-13",
        slot: 100,
      },
      {
        id: 42,
        startDate: "2025-04-11",
        endDate: "2025-04-14",
        slot: 100,
      },
    ],
    itineraries: [
      {
        id: 31,
        dayNumber: 1,
        title: "A",
        description: "<p>A</p>",
      },
    ],
    faqs: [
      {
        id: 31,
        question: "A",
        answer: "<p>A</p>",
      },
    ],
    imageTours: [
      {
        id: 39,
        path: "details/HoangMinhQuan.jpg",
        imageName: "HoangMinhQuan.jpg",
      },
      {
        id: 40,
        path: "details/HoangMinhQuan.png",
        imageName: "HoangMinhQuan.png",
      },
    ],
  },
};

// Gọi hàm để chuyển dữ liệu API vào tour
onMounted(() => {
  const tourData = apiResponse.data; // Lấy dữ liệu từ response
  console.log("Tour data:", tourData);
  setTourData(tourData);
});

// Hàm xử lý khi nhận sự kiện update:tourInfo từ component con
const handleTourInfoUpdate = (updatedTourInfo) => {
  console.log("Tour info updated:", updatedTourInfo);
  tour.value.tourInfo = updatedTourInfo;
  console.log("Tour info:", tour.value.tourInfo);
};

const handleScheduleUpdate = (schedule) => {
  console.log("Schedule info updated:", schedule);
  // Cập nhật giá trị tourInfo trong component cha
  const formattedSchedule = schedule.map((date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0"); // Thêm số 0 vào tháng nếu < 10
    const day = String(formattedDate.getDate()).padStart(2, "0"); // Thêm số 0 vào ngày nếu < 10

    return { startDate: `${year}-${month}-${day}` };
  });
  tour.value.schedules = formattedSchedule;
  console.log("Tour info:", tour.value.schedules);
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
    const response = await createTour(tour.value);
    alert("Form submitted successfully!");
    await uploadImageFunction(response.data.id);
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
