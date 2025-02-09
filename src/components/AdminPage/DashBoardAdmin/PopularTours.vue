<template>
    <v-card outlined>
      <v-card-title>Popular Tours</v-card-title>
      <v-card-subtitle>Top-selling tours</v-card-subtitle>
      <v-list>
        <v-list-item v-for="(tour, index) in tours" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ tour.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ tour.bookings }} bookings</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-chip class="ma-2" outlined color="blue">
              ${{ tour.price }}
            </v-chip>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'PopularTours',
    data() {
      return {
        tours: [
          { name: 'Halong Bay Cruise', bookings: 450, price: 299 },
          { name: 'Sapa Adventure', bookings: 320, price: 199 },
          { name: 'Hoi An City Tour', bookings: 280, price: 149 },
        ],
      };
    },
  };
  </script>
  