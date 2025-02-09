<template>
  <v-card class="mb-4">
    <v-card-title>Reviews</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(review, index) in reviews" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ review.author }}</v-list-item-title>
            <v-rating
              :value="review.rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <v-list-item-subtitle>{{ review.comment }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TravelReviews",
  props: {
    reviews: Array,
  },
};
</script>
