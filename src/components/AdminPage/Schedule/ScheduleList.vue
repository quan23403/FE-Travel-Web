<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- Thêm nút để thêm lịch trình mới -->
        <v-btn color="primary" @click="openAddDialog">Add Schedule</v-btn>
        <v-data-table
          :headers="headers"
          :items="schedules"
          item-key="scheduleId"
          class="elevation-1"
        >
          <template v-slot:[`item.scheduleId`]="{ item }">
            <span>{{ item.scheduleId }}</span>
          </template>
          <template v-slot:[`item.tourName`]="{ item }">
            <span>{{ item.tourName }}</span>
          </template>
          <template v-slot:[`item.startLocation`]="{ item }">
            <span>{{ item.startLocation }}</span>
          </template>
          <template v-slot:[`item.endLocation`]="{ item }">
            <span>{{ item.endLocation }}</span>
          </template>
          <template v-slot:[`item.startDate`]="{ item }">
            <span>{{ item.startDate }}</span>
          </template>
          <template v-slot:[`item.endDate`]="{ item }">
            <span>{{ item.endDate }}</span>
          </template>
          <template v-slot:[`item.slot`]="{ item }">
            <span>{{ item.slot }}</span>
          </template>
          <template v-slot:[`item.basePrice`]="{ item }">
            <span>${{ item.basePrice }}</span>
          </template>
          <template v-slot:[`item.discount`]="{ item }">
            <span>{{ item.discount }}%</span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="openEditDialog(item)" class="mr-2" color="primary">
              mdi-pencil
            </v-icon>
            <v-icon @click="deleteSchedule(item.id)" color="red">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Dialog to Add New Schedule -->
    <v-dialog v-model="addDialog" max-width="500px">
      <v-card>
        <v-card-title>Add New Schedule</v-card-title>
        <v-card-text>
          <v-select
            :items="tours"
            item-title="name"
            item-value="id"
            label="Tour Name"
            variant="outlined"
            @update:modelValue="onTourSelected"
          />
          <v-date-input
            v-model="newSchedule.startDate"
            label="Start Date"
            prepend-icon=""
            variant="outlined"
            persistent-placeholder
            multiple
            :min="minDate"
          ></v-date-input>
          <v-text-field
            v-model="newSchedule.startLocation"
            label="Start Location"
            variant="outlined"
          />
          <v-text-field
            v-model="newSchedule.endLocation"
            label="End Location"
            variant="outlined"
          />
          <v-text-field
            v-model="newSchedule.slot"
            label="Slot"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="newSchedule.price"
            label="Price"
            type="number"
            variant="outlined"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" text @click="saveNewSchedule">Save</v-btn>
          <v-btn color="red" text @click="closeAddDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog to Edit Schedule -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Schedule</v-card-title>
        <v-card-text>
          <v-text-field v-model="selectedSchedule.tourName" label="Tour Name" />
          <v-text-field
            v-model="selectedSchedule.startLocation"
            label="Start Location"
          />
          <v-text-field
            v-model="selectedSchedule.endLocation"
            label="End Location"
          />
          <v-text-field
            v-model="selectedSchedule.startDate"
            label="Start Date"
            type="date"
          />
          <v-text-field
            v-model="selectedSchedule.endDate"
            label="End Date"
            type="date"
          />
          <v-text-field
            v-model="selectedSchedule.slot"
            label="Slot"
            type="number"
          />
          <v-text-field
            v-model="selectedSchedule.basePrice"
            label="Price"
            type="number"
          />
          <v-text-field
            v-model="selectedSchedule.discount"
            label="Discount"
            type="number"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" text @click="saveEditedSchedule">Save</v-btn>
          <v-btn color="red" text @click="closeEditDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  <p>{{ newSchedule.startDate }}</p>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { createSchedule } from "@/api/api"; // Import your API function
import { getAllSchedules } from "@/api/api";
import { getAllTours } from "@/api/api";
// Dữ liệu và tiêu đề bảng
const schedules = ref([]);
const tours = ref([]);
const today = new Date();
const minDate = today.toISOString().substr(0, 10); // yyyy-mm-dd
const headers = [
  { title: "ID", align: "start", key: "scheduleId" },
  { title: "Tour Name", align: "start", key: "tourName", sortable: true },
  { title: "Start Location", align: "start", key: "startLocation" },
  { title: "End Location", align: "start", key: "endLocation" },
  { title: "Start Date", align: "start", key: "startDate" },
  { title: "End Date", align: "start", key: "endDate" },
  { title: "Slot", align: "start", key: "slot" },
  { title: "Base Price", align: "start", key: "basePrice" },
  { title: "Discount", align: "start", key: "discount" },
  { title: "Actions", align: "center", key: "actions" },
];

// Các biến điều khiển dialog
const addDialog = ref(false);
const editDialog = ref(false);

// Dữ liệu cho form thêm và chỉnh sửa
const newSchedule = ref({
  tourName: "",
  startLocation: "",
  endLocation: "",
  startDate: [],
  slot: null,
  tourId: null,
  basePrice: null,
  discount: null,
});

const selectedSchedule = ref({});
const getAllSchedulesFunction = async () => {
  try {
    const response = await getAllSchedules();
    schedules.value = response.data.data;
  } catch (error) {
    console.error("Error fetching schedules:", error);
  }
};

const getAllToursFunction = async () => {
  try {
    const response = await getAllTours();
    tours.value = response.data.data;
    console.log("Tours fetched:", tours.value);
  } catch (error) {
    console.error("Error fetching tours:", error);
  }
};

onMounted(() => {
  getAllSchedulesFunction();
  getAllToursFunction();
});

const openAddDialog = () => {
  addDialog.value = true;
};

const closeAddDialog = () => {
  newSchedule.value = {
    tourName: "",
    startLocation: "",
    endLocation: "",
    startDate: [],
    slot: null,
    tourId: null,
    basePrice: null,
    discount: null,
  };
  addDialog.value = false;
};

const openEditDialog = (item) => {
  selectedSchedule.value = { ...item }; // Copy selected schedule for editing
  editDialog.value = true;
};

const closeEditDialog = () => {
  editDialog.value = false;
};

const onTourSelected = (tourID) => {
  const selectedTour = tours.value.find((t) => t.id === tourID);
  if (selectedTour) {
    newSchedule.value.tourId = selectedTour.tourId;
    newSchedule.value.startLocation = selectedTour.startLocation;
    newSchedule.value.endLocation = selectedTour.endLocation;
    newSchedule.value.price =
      selectedTour.basePrice * (1 - selectedTour.discount / 100);
    newSchedule.value.slot = selectedTour.slot;
  }
};

const saveNewSchedule = async () => {
  try {
    const data = {
      tourId: newSchedule.value.tourId,
      startDate: newSchedule.value.startDate.map((d) => formatDate(d)),
    };
    console.log("New schedule data:", data);
    const response = await createSchedule(data);
    console.log("Schedule created:", response.data);
    closeAddDialog();
  } catch (error) {
    console.error("Error creating schedule:", error);
  }
};

// Hàm format date theo dạng yyyy/MM/dd
function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
