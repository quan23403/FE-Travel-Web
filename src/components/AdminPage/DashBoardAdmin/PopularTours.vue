<template>
  <v-card outlined>
    <v-card-title>Popular Tours</v-card-title>
    <v-card-subtitle>Top-selling tours</v-card-subtitle>
    <v-list>
      <v-list-item v-for="(tour, index) in tours" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ tour.name }}</v-list-item-title>
          <v-list-item-subtitle
            >{{ tour.booking }} bookings</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-icon>
          <v-chip class="ma-2" outlined color="blue">
            {{ tour.price }} VND
          </v-chip>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { topBookings } from "@/api/api";

// Fetch the top bookings data from the API
onMounted(async () => {
  try {
    const response = await topBookings();
    tours.value = response.data;
  } catch (error) {
    console.error("Error fetching top bookings:", error);
  }
});
const tours = ref([
  { name: "Halong Bay Cruise", booking: 450, price: 299 },
  { name: "Sapa Adventure", booking: 320, price: 199 },
  { name: "Hoi An City Tour", booking: 280, price: 149 },
]);
</script>
