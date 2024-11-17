<template>
  <v-card class="mb-4">
    <v-card-title>Gallery</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="(image, index) in images"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-img :src="image" aspect-ratio="1" class="grey lighten-2">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TravelGallery",
  props: {
    images: Array,
  },
};
</script>
