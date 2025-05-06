<template>
    <v-container class="pa-4">
      <v-card class="pa-4">
        <v-card-title class="text-h5">Kết Quả Thanh Toán</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <v-alert v-if="paymentResult" type="success" class="mb-4">
                <strong>Thanh toán thành công!</strong>
              </v-alert>
              <v-alert v-if="error" type="error" class="mb-4">
                <strong>Thanh toán thất bại!</strong> Vui lòng thử lại sau.
              </v-alert>
  
              <v-row>
                <v-col cols="12">
                  <div><strong>Mã giao dịch:</strong> {{ paymentData.txnRef }}</div>
                </v-col>
                <v-col cols="12">
                  <div><strong>Số tiền thanh toán:</strong> {{ formattedAmount }} VNĐ</div>
                </v-col>
                <v-col cols="12">
                  <div><strong>Trạng thái:</strong> {{ paymentStatus }}</div>
                </v-col>
                <v-col cols="12" v-if="paymentData.responseCode">
                  <div><strong>Mã phản hồi:</strong> {{ paymentData.responseCode }}</div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router';
  
  // Lấy thông tin từ URL trả về của VNPAY
  const route = useRoute();
  const router = useRouter();
  const paymentData = ref({
    txnRef: '',
    amount: 0,
    responseCode: '',
    transactionNo: '',
  });
  const paymentResult = ref(false);
  const error = ref(false);
  
  // Lấy các tham số từ URL sau khi VNPAY trả về
  onMounted(() => {
    const params = route.query;
  
    // Kiểm tra xem có các tham số cần thiết không
    if (params.vnp_ResponseCode === '00') {
      paymentData.value.txnRef = params.vnp_TxnRef || '';
      paymentData.value.amount = params.vnp_Amount || 0;
      paymentData.value.responseCode = params.vnp_ResponseCode || '';
      paymentData.value.transactionNo = params.vnp_TransactionNo || '';
  
      // Cập nhật trạng thái thanh toán
      paymentResult.value = true;
    } else {
      error.value = true; // Nếu không thành công, hiển thị lỗi
    }
  });
  
  // Tính toán số tiền đã thanh toán (chuyển từ cent sang VNĐ)
  const formattedAmount = computed(() => {
    return new Intl.NumberFormat('vi-VN').format(paymentData.value.amount / 100);
  });
  
  // Trạng thái thanh toán
  const paymentStatus = computed(() => {
    return paymentResult.value ? 'Thành công' : 'Thất bại';
  });
  </script>
  
  <style scoped>
  .v-card {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .text-h5 {
    font-weight: bold;
  }
  
  .v-alert {
    margin-bottom: 1rem;
  }
  </style>
  