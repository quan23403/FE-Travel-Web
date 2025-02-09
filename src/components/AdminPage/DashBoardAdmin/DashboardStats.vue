<template>
  <v-row>
    <v-col cols="12" md="3">
      <v-card outlined class="pa-3">
        <v-icon large class="blue--text">mdi-map</v-icon>
        <div class="font-weight-medium text-h6">Total Tours</div>
        <div class="text-h5 font-weight-bold">125</div>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card outlined class="pa-3">
        <v-icon large class="green--text">mdi-account-group</v-icon>
        <div class="font-weight-medium text-h6">Total Users</div>
        <div class="text-h5 font-weight-bold">5,432</div>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card outlined class="pa-3">
        <v-icon large class="orange--text">mdi-cart</v-icon>
        <div class="font-weight-medium text-h6">Bookings</div>
        <div class="text-h5 font-weight-bold">1,245</div>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card outlined class="pa-3">
        <v-icon large class="red--text">mdi-currency-usd</v-icon>
        <div class="font-weight-medium text-h6">Revenue</div>
        <div class="text-h5 font-weight-bold">$45,300</div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DashboardStats",
};
</script>

<style scoped>
.text-h6 {
  margin-top: 8px;
}
</style>
