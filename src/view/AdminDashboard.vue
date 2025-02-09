<template>
    <v-container fluid>
      <!-- Thống kê -->
      <dashboard-stats />
  
      <!-- Biểu đồ và tour nổi bật -->
      <v-row class="mt-5">
        <v-col cols="12" md="8">
          <dashboard-charts />
        </v-col>
        <v-col cols="12" md="4">
          <popular-tours />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import DashboardStats from '@/components/AdminPage/DashBoardAdmin/DashboardStats.vue';
  import DashboardCharts from '@/components/AdminPage/DashBoardAdmin/DashboardCharts.vue';
  import PopularTours from '@/components/AdminPage/DashBoardAdmin/PopularTours.vue';
  
  export default {
    name: 'AdminDashboard',
    components: {
      DashboardStats,
      DashboardCharts,
      PopularTours,
    },
  };
  </script>
  