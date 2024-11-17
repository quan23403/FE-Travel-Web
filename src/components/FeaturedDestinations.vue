<template>
  <v-container class="my-16">
    <h1 class="text-h3 text-center mb-8">FAVORITE DESTINATION</h1>
    <v-row>
      <v-col
        v-for="destination in destinations"
        :key="destination.name"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card href="https://github.com/vuetifyjs/vuetify/">
          <v-img :src="destination.image" height="200" cover></v-img>
          <v-card-title>{{ destination.name }}</v-card-title>
          <v-card-text>{{ destination.description }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary">Learn More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const destinations = ref([
  {
    name: "Paris",
    image:
      "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
    description:
      "The City of Light awaits with its iconic landmarks and charming streets.",
  },
  {
    name: "Bali",
    image:
      "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
    description:
      "Experience the perfect blend of beaches, culture, and tranquility.",
  },
  {
    name: "New York",
    image:
      "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
    description:
      "Dive into the energy of the Big Apple, where dreams come to life.",
  },
  {
    name: "Bali",
    image:
      "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
    description:
      "Experience the perfect blend of beaches, culture, and tranquility.",
  },
  {
    name: "New York",
    image:
      "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
    description:
      "Dive into the energy of the Big Apple, where dreams come to life.",
  },
]);
</script>
