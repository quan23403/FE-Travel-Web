<template>
  <v-container fluid>
    <TravelHeader
      :level="travelData.level"
      :title="travelData.name"
      :detailImages="travelData.imageTours"
    />

    <v-row>
      <v-col cols="12" md="8">
        <TravelDescription :description="travelData.description" />
        <TravelItinerary :itinerary="travelData.itineraries" />
      </v-col>
      <v-col cols="12" md="4">
        <TravelBooking
          :travelData="travelData"
          :schedules="travelData.schedules"
          :price="travelData.basePrice * (1 - (travelData.discount / 100))"
        />
      </v-col>
      <v-col cols="12">
        <TravelFaq :faqs="travelData.faqs"/>
        <TravelReviews :reviews="travelReviews" />
      </v-col>
      <v-col cols="12">
        <related-tour :relatedTours="relatedTours"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import TravelHeader from "@/components/TravelDetailPage/TravelHeader.vue";
import TravelDescription from "@/components/TravelDetailPage/TravelDescription.vue";
import TravelItinerary from "@/components/TravelDetailPage/TravelItinerary.vue";
import TravelFaq from "@/components/TravelDetailPage/TravelFaq.vue";
import TravelReviews from "@/components/TravelDetailPage/TravelReviews.vue";
import TravelBooking from "@/components/TravelDetailPage/TravelBooking.vue";
import RelatedTour from "@/components/RelatedTour.vue";
import { getTourById } from "@/api/api";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getFeedbackByTourId } from "@/api/api";
import axios from "axios";
const route = useRoute();
const travelData = ref({});
const travelReviews = ref({});
const relatedTours = ref([]);
onMounted(() => {
  const tourId = route.params.id;
  getTourDetails(tourId);
  getFeedback(tourId);
  getRelatedTours(tourId);
});

const getRelatedTours = async (tourId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/tours/related/${tourId}`
    ); // Replace with your actual API endpoint
    if (response && response.data) {
      relatedTours.value = response.data.data; // Assuming the API returns the data in this format
      console.log("Related tours fetched successfully:", relatedTours.value);
    } else {
      console.error("No related tours found for the given tour ID.");
    }
  } catch (error) {
    console.error("Error fetching related tours:", error);
  }
};

const getFeedback = async (tourId) => {
  try {
    const response = await getFeedbackByTourId(tourId);
    if (response && response.data) {
      travelReviews.value = response.data.data; // Assuming the API returns the data in this format
      console.log("Reviews fetched successfully:", travelReviews.value);
    } else {
      console.error("No reviews found for the given tour ID.");
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};
const getTourDetails = async (tourId) => {
  try {
    const response = await getTourById(tourId);
    if (response && response.data) {
      travelData.value = response.data.data; // Assuming the API returns the data in this format
      console.log("Tour details fetched successfully:", travelData.value);
    } else {
      console.error("No data found for the given tour ID.");
    }
  } catch (error) {
    console.error("Error fetching tour details:", error);
  }
};
</script>
