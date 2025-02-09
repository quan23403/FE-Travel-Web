<template>
  <v-container fluid>
    <TravelHeader :title="travelData.title" :image="travelData.mainImage" />

    <v-row>
      <v-col cols="12" md="8">
        <TravelDescription :description="travelData.description" />
        <TravelItinerary :itinerary="travelData.itinerary" />
        <TravelGallery :images="travelData.gallery" />
        <TravelReviews :reviews="travelData.reviews" />
      </v-col>

      <v-col cols="12" md="4">
        <TravelBooking
          :price="travelData.price"
          :duration="travelData.duration"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TravelHeader from "@/components/TravelDetailPage/TravelHeader.vue";
import TravelDescription from "@/components/TravelDetailPage/TravelDescription.vue";
import TravelItinerary from "@/components/TravelDetailPage/TravelItinerary.vue";
import TravelGallery from "@/components/TravelDetailPage/TravelGallery.vue";
import TravelReviews from "@/components/TravelDetailPage/TravelReviews.vue";
import TravelBooking from "@/components/TravelDetailPage/TravelBooking.vue";

export default {
  name: "TravelDetail",
  components: {
    TravelHeader,
    TravelDescription,
    TravelItinerary,
    TravelGallery,
    TravelReviews,
    TravelBooking,
  },
  data() {
    return {
      travelData: {
        title: "Explore Beautiful Bali",
        mainImage: "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
        description:
          "Experience the magic of Bali with its stunning beaches, lush rice terraces, and vibrant culture.",
        itinerary: [
          {
            day: 1,
            description: "Arrive in Denpasar, transfer to hotel in Ubud",
          },
          {
            day: 2,
            description: "Explore Ubud: Visit Monkey Forest and Rice Terraces",
          },
          {
            day: 3,
            description: "Day trip to Tegalalang and Tirta Empul Temple",
          },
          // ... more days
        ],
        gallery: [
          "https://example.com/bali-1.jpg",
          "https://example.com/bali-2.jpg",
          "https://example.com/bali-3.jpg",
          // ... more images
        ],
        reviews: [
          {
            author: "John D.",
            rating: 5,
            comment: "Amazing experience! Highly recommended.",
          },
          {
            author: "Sarah M.",
            rating: 4,
            comment: "Beautiful scenery and friendly people.",
          },
          // ... more reviews
        ],
        price: 1299,
        duration: 7,
      },
    };
  },
};
</script>
