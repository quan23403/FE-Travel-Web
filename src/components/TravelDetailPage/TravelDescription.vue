<template>
  <v-card class="mb-4">
    <v-card-title>About this trip</v-card-title>
    <v-card-text>
      <p>{{ description }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TravelDescription",
  props: {
    description: String,
  },
};
</script>
