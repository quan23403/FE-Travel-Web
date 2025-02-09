<template>
    <v-container class="pa-4">
      <!-- Form đặt tour -->
      <v-card class="pa-4">
        <v-card-title class="text-h5">Đặt Tour</v-card-title>
        <v-card-text>
          <v-form ref="bookingForm" v-model="valid">
            <!-- Ngày khởi hành -->
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.startDate"
                  label="Ngày khởi hành"
                  type="date"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
  
            <!-- Số lượng người -->
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model.number="form.adults"
                  label="Người lớn"
                  type="number"
                  min="1"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model.number="form.children"
                  label="Trẻ em"
                  type="number"
                  min="0"
                ></v-text-field>
              </v-col>
            </v-row>
  
            <!-- Lựa chọn gói tour -->
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="form.package"
                  :items="packages"
                  label="Chọn gói tour"
                  required
                ></v-select>
              </v-col>
            </v-row>
  
            <!-- Hiển thị tổng chi phí -->
            <v-row>
              <v-col cols="12" class="d-flex justify-space-between">
                <span class="text-h6">Tổng chi phí:</span>
                <span class="text-h6 font-weight-bold">
                  {{ formattedTotalCost }}
                </span>
              </v-col>
            </v-row>
  
            <!-- Nút đặt ngay -->
            <v-row>
              <v-col cols="12">
                <v-btn
                  color="primary"
                  block
                  :disabled="!valid"
                  @click="handleBooking"
                >
                  Đặt ngay
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "TravelBooking",
    data() {
      return {
        valid: false,
        form: {
          startDate: "",
          adults: 1,
          children: 0,
          package: null,
        },
        packages: [
          { text: "Gói tiêu chuẩn", value: "standard", price: 500000 },
          { text: "Gói cao cấp", value: "premium", price: 800000 },
        ],
      };
    },
    computed: {
      // Tính tổng chi phí dựa trên gói và số người
      totalCost() {
        const selectedPackage = this.packages.find(
          (pkg) => pkg.value === this.form.package
        );
        if (!selectedPackage) return 0;
  
        const adultsCost = this.form.adults * selectedPackage.price;
        const childrenCost = this.form.children * (selectedPackage.price * 0.7); // Trẻ em tính 70%
        return adultsCost + childrenCost;
      },
      // Hiển thị chi phí được định dạng
      formattedTotalCost() {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(this.totalCost);
      },
    },
    methods: {
      // Xử lý đặt tour
      handleBooking() {
        if (!this.valid) {
          this.$refs.bookingForm.validate();
          return;
        }
  
        alert(
          `Bạn đã đặt tour thành công!\nNgày khởi hành: ${this.form.startDate}\nNgười lớn: ${this.form.adults}\nTrẻ em: ${this.form.children}\nGói: ${
            this.form.package
          }\nTổng chi phí: ${this.formattedTotalCost}`
        );
  
        // Reset form sau khi đặt thành công
        this.resetForm();
      },
      resetForm() {
        this.form = {
          startDate: "",
          adults: 1,
          children: 0,
          package: null,
        };
        this.$refs.bookingForm.resetValidation();
      },
    },
  };
  </script>
  
  <style scoped>
  .text-h6 {
    margin: 0;
  }
  </style>
  