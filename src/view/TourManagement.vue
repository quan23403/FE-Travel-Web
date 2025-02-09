<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h6">Quản Lý Tour Du Lịch</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openAddDialog">Thêm Tour</v-btn>
      </v-card-title>

      <tour-table
        :tours="tours"
        @edit="editTour"
        @delete="deleteTour"
      ></tour-table>

      <tour-dialog
        :dialog="dialog"
        :tour="editedTour"
        :dialog-title="dialogTitle"
        @save="saveTour"
        @close="closeDialog"
      ></tour-dialog>
    </v-card>
  </v-container>
</template>

<script>
import TourTable from "@/components/AdminPage/TourManagementAdmin/TourTable.vue";
import TourDialog from "@/components/AdminPage/TourManagementAdmin/TourDialog.vue";

export default {
  components: {
    TourTable,
    TourDialog,
  },
  data() {
    return {
      dialog: false,
      dialogTitle: "",
      tours: [
        {
          id: 1,
          name: "Tour Hạ Long",
          description: "Khám phá kỳ quan thiên nhiên thế giới.",
          price: 2000000,
          location: "Hạ Long",
        },
        {
          id: 2,
          name: "Tour Đà Lạt",
          description: "Thành phố ngàn hoa.",
          price: 1500000,
          location: "Đà Lạt",
        },
      ],
      editedTour: {
        id: null,
        name: "",
        description: "",
        price: null,
        location: "",
      },
    };
  },
  methods: {
    openAddDialog() {
      this.dialogTitle = "Thêm Tour";
      this.editedTour = {
        id: null,
        name: "",
        description: "",
        price: null,
        location: "",
      };
      this.dialog = true;
    },
    editTour(tour) {
      this.dialogTitle = "Chỉnh Sửa Tour";
      this.editedTour = { ...tour };
      this.dialog = true;
      console.log(this.dialog);
    },
    deleteTour(id) {
      if (confirm("Bạn có chắc chắn muốn xóa tour này?")) {
        this.tours = this.tours.filter((tour) => tour.id !== id);
      }
    },
    saveTour(tour) {
      if (tour.id) {
        const index = this.tours.findIndex((t) => t.id === tour.id);
        if (index !== -1) this.tours.splice(index, 1, tour);
      } else {
        tour.id = this.tours.length + 1;
        this.tours.push(tour);
      }
      this.closeDialog();
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>
