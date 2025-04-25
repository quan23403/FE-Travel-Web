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
        <TravelReviews :reviews="travelData.reviews" />
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
import { getTourById } from "@/api/api";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const travelData = ref({});

onMounted(() => {
  const tourId = route.params.id;
  getTourDetails(tourId);
});

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
