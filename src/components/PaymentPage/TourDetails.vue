<template>
  <v-card>
    <v-img
      src="/placeholder.svg?height=300&width=500"
      height="300"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    >
      <v-card-title class="text-h4">{{ tour.name }}</v-card-title>
    </v-img>
    <v-card-text>
      <v-row align="center" class="mx-0 mt-2">
        <v-rating
          :value="tour.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
        <div class="grey--text ms-4">
          {{ tour.rating }} ({{ tour.reviewCount }} reviews)
        </div>
      </v-row>
      <div class="my-4 text-subtitle-1">
        <v-icon>mdi-map-marker</v-icon>
        {{ tour.destination }}
      </div>
      <div class="my-4 text-subtitle-1">
        <v-icon>mdi-calendar-range</v-icon>
        {{ tour.duration }}
      </div>
      <v-divider class="my-4"></v-divider>
      <div class="text-h6 font-weight-bold mb-2">Tour Highlights</div>
      <v-list dense>
        <v-list-item v-for="(highlight, index) in tour.highlights" :key="index">
          <v-list-item-icon>
            <v-icon color="primary">mdi-check-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ highlight }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider class="my-4"></v-divider>
      <div class="text-h6 font-weight-bold mb-2">Price</div>
      <div class="text-h4 primary--text">${{ tour.price.toFixed(2) }}</div>
      <div class="text-caption">per person</div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  tour: {
    type: Object,
    required: true,
  },
});
</script>
