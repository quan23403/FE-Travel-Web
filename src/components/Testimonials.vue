<template>
    <v-container class="my-16">
      <h2 class="text-h3 text-center mb-8">What Our Travelers Say</h2>
      <v-row>
        <v-col v-for="testimonial in testimonials" :key="testimonial.name" cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-text>
              <p class="text-h6 text--primary">
                "{{ testimonial.quote }}"
              </p>
              <p class="text-subtitle-1 text--secondary">
                {{ testimonial.name }}
              </p>
              <p class="text-subtitle-2 text--secondary">
                {{ testimonial.trip }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const testimonials = ref([
    {
      name: 'Sarah Johnson',
      quote: 'TravelVue made our honeymoon absolutely perfect. Every detail was taken care of!',
      trip: 'Romantic Getaway to Maldives',
    },
    {
      name: 'Mike Thompson',
      quote: 'As a solo traveler, I felt safe and had an amazing time exploring Japan. Highly recommend!',
      trip: 'Cultural Tour of Japan',
    },
    {
      name: 'The Garcia Family',
      quote: 'Our family vacation to Costa Rica was unforgettable. The kids loved every minute of it!',
      trip: 'Costa Rica Adventure',
    },
  ]);
  </script>