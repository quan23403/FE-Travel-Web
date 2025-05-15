<template>
  <v-container class="my-16">
    <h1 class="text-h3 text-center mb-8">Dịch vụ của chúng tôi</h1>

    <v-row dense>
      <v-col
        v-for="(service, index) in services"
        :key="index"
        cols="12"
        md="4"
        class="mb-6"
      >
        <v-card outlined class="pa-4 text-center hover-elevation-8">
          <v-icon size="64" class="mb-4" color="primary">{{ service.icon }}</v-icon>
          <div class="text-h5 font-weight-bold mb-2">{{ service.title }}</div>
          <div class="text-body-1">{{ service.description }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const services = ref([
  {
    icon: 'mdi-map-marker-check',
    title: 'Tư vấn Tour',
    description: 'Tư vấn lựa chọn tour phù hợp theo sở thích, thời gian và ngân sách của bạn.',
  },
  {
    icon: 'mdi-account-group',
    title: 'Hỗ trợ Đặt chỗ',
    description: 'Đặt vé máy bay, khách sạn và dịch vụ đi kèm nhanh chóng và tiện lợi.',
  },
  {
    icon: 'mdi-airplane',
    title: 'Vận chuyển',
    description: 'Cung cấp dịch vụ đưa đón sân bay và các phương tiện di chuyển trong tour.',
  },
  {
    icon: 'mdi-hotel',
    title: 'Khách sạn chất lượng',
    description: 'Hợp tác với các khách sạn uy tín để mang đến chỗ nghỉ thoải mái cho bạn.',
  },
  {
    icon: 'mdi-food',
    title: 'Ẩm thực đặc sắc',
    description: 'Khám phá ẩm thực địa phương phong phú cùng các nhà hàng được tuyển chọn.',
  },
  {
    icon: 'mdi-earth',
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ hỗ trợ luôn sẵn sàng giúp bạn trong suốt hành trình.',
  },
]);
</script>

<style scoped>
.hover-elevation-8 {
  transition: box-shadow 0.3s ease;
}
.hover-elevation-8:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
</style>
