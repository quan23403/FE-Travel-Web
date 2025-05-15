<template>
  <v-container class="my-16">
    <h1 class="text-h3 text-center mb-8">Về Chúng Tôi</h1>

    <v-row>
      <v-col cols="12" md="6">
        <v-img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="About Us"
          height="400"
          class="rounded-lg"
        />
      </v-col>

      <v-col cols="12" md="6">
        <div class="mb-6">
          <h2 class="text-h5 font-weight-bold mb-3">Tầm Nhìn</h2>
          <p>
            Trở thành công ty du lịch hàng đầu tại Việt Nam, mang đến trải
            nghiệm du lịch tuyệt vời và khác biệt cho khách hàng trong nước và
            quốc tế.
          </p>
        </div>

        <div class="mb-6">
          <h2 class="text-h5 font-weight-bold mb-3">Sứ Mệnh</h2>
          <p>
            Cung cấp các dịch vụ du lịch chất lượng cao, đa dạng sản phẩm, đồng
            thời hỗ trợ khách hàng tận tâm để tạo nên những chuyến đi đáng nhớ.
          </p>
        </div>

        <div>
          <h2 class="text-h5 font-weight-bold mb-3">Giá Trị Cốt Lõi</h2>
          <ul>
            <li>Chất lượng & Uy tín</li>
            <li>Khách hàng là trung tâm</li>
            <li>Đổi mới & Sáng tạo</li>
            <li>Hợp tác bền vững</li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Không cần script nếu dữ liệu tĩnh
</script>

<style scoped>
ul {
  padding-left: 1.2rem;
  list-style-type: disc;
}

li {
  margin-bottom: 0.5rem;
}
</style>
