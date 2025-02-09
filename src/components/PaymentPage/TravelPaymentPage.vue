<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="7">
        <contact-form @update:contact-info="updateContactInfo" />
        <payment-form @update:payment-info="updatePaymentInfo" />
        <v-card-actions class="justify-center mt-4">
          <v-btn
            color="primary"
            x-large
            @click="submitPayment"
            :loading="loading"
          >
            Complete Booking
          </v-btn>
        </v-card-actions>
      </v-col>
      <v-col cols="12" md="5">
        <tour-details :tour="tourDetails" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import ContactForm from "./ContactForm.vue";
import PaymentForm from "./PaymentForm.vue";
import TourDetails from "./TourDetails.vue";

const loading = ref(false);

const contactInfo = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
});

const paymentInfo = reactive({
  cardName: "",
  cardNumber: "",
  expiryMonth: null,
  expiryYear: null,
  cvv: "",
});

const tourDetails = reactive({
  name: "Hạ Long Bay Adventure",
  destination: "Hạ Long Bay, Vietnam",
  duration: "3 days, 2 nights",
  rating: 4.5,
  reviewCount: 128,
  highlights: [
    "Cruise through stunning limestone karsts",
    "Visit floating fishing villages",
    "Kayak in hidden lagoons",
    "Explore mysterious caves",
    "Enjoy fresh seafood dinners",
  ],
  price: 299.99,
});

const updateContactInfo = (info) => {
  Object.assign(contactInfo, info);
};

const updatePaymentInfo = (info) => {
  Object.assign(paymentInfo, info);
};

const submitPayment = async () => {
  loading.value = true;
  // Simulate payment processing
  setTimeout(() => {
    loading.value = false;
    alert("Booking completed successfully!");
    console.log("Booking details:", { contactInfo, paymentInfo, tourDetails });
    // Here you would typically send the booking data to your server
  }, 2000);
};
</script>
