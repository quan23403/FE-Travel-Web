<template>
  <v-card class="mb-4">
    <v-card-title>Mô tả chuyến đi</v-card-title>
    <v-card-text>
      <div class="text-body-1" v-html="description"></div>
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
