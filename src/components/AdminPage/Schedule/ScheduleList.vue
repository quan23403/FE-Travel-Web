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
            :items="schedules"
            item-title="tourName"
            item-value="tourId"
            label="Tour Name"
            @update:modelValue="onTourSelected"
          />
          <v-text-field
            v-model="newSchedule.startLocation"
            label="Start Location"
          />
          <v-text-field
            v-model="newSchedule.endLocation"
            label="End Location"
          />
          <v-text-field
            v-model="newSchedule.startDate"
            label="Start Date"
            type="date"
          />
          <v-text-field
            v-model="newSchedule.endDate"
            label="End Date"
            type="date"
          />
          <v-text-field v-model="newSchedule.slot" label="Slot" type="number" />
          <v-text-field
            v-model="newSchedule.basePrice"
            label="Price"
            type="number"
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
            label="Base Price"
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
</template>

<script setup>
import { ref } from "vue";

// Dữ liệu và tiêu đề bảng
const schedules = ref([
  {
    scheduleId: 7,
    startDate: "2025-04-01",
    endDate: "2025-04-04",
    slot: 20,
    tourName: "Adventure in Vietnam",
    tourId: 4,
    startLocation: "Hanoi",
    endLocation: "Ho Chi Minh City",
    thumbnailUrl: "",
    basePrice: 500.0,
    discount: 10.0,
  },
  {
    scheduleId: 8,
    startDate: "2025-04-01",
    endDate: "2025-04-04",
    slot: 20,
    tourName: "Adventure in Hello",
    tourId: 5,
    startLocation: "Hanoi",
    endLocation: "Ho Chi Minh City",
    thumbnailUrl: "",
    basePrice: 500.0,
    discount: 10.0,
  },
]);

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
  startDate: "",
  endDate: "",
  slot: null,
  basePrice: null,
  discount: null,
});

const selectedSchedule = ref({});

// Các phương thức
const openAddDialog = () => {
  addDialog.value = true;
};

const closeAddDialog = () => {
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
  const selectedTour = schedules.value.find((t) => t.tourId === tourID);
  if (selectedTour) {
    newSchedule.value.startLocation = selectedTour.startLocation;
    newSchedule.value.endLocation = selectedTour.endLocation;
    newSchedule.value.basePrice = selectedTour.basePrice;
    newSchedule.value.discount = selectedTour.discount;
  }
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
