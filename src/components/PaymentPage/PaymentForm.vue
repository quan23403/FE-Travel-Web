<template>
  <v-card>
    <v-card-title class="text-h5 font-weight-bold primary--text">
      Payment Information
    </v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="cardName"
              label="Name on Card"
              :rules="[(v) => !!v || 'Name is required']"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="cardNumber"
              label="Card Number"
              :rules="[
                (v) => !!v || 'Card number is required',
                (v) =>
                  (v && v.length === 16) || 'Card number must be 16 digits',
              ]"
              required
              maxlength="16"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="expiryMonth"
              :items="months"
              label="Expiry Month"
              :rules="[(v) => !!v || 'Expiry month is required']"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="expiryYear"
              :items="years"
              label="Expiry Year"
              :rules="[(v) => !!v || 'Expiry year is required']"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="cvv"
              label="CVV"
              :rules="[
                (v) => !!v || 'CVV is required',
                (v) => (v && v.length === 3) || 'CVV must be 3 digits',
              ]"
              required
              maxlength="3"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";

const form = ref(null);
const cardName = ref("");
const cardNumber = ref("");
const expiryMonth = ref(null);
const expiryYear = ref(null);
const cvv = ref("");

const emit = defineEmits(["update:paymentInfo"]);

const months = Array.from({ length: 12 }, (_, i) => ({
  text: `${i + 1}`.padStart(2, "0"),
  value: i + 1,
}));

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => ({
  text: `${currentYear + i}`,
  value: currentYear + i,
}));

watch([cardName, cardNumber, expiryMonth, expiryYear, cvv], () => {
  emit("update:paymentInfo", {
    cardName: cardName.value,
    cardNumber: cardNumber.value,
    expiryMonth: expiryMonth.value,
    expiryYear: expiryYear.value,
    cvv: cvv.value,
  });
});

const submitForm = () => {
  form.value.validate();
};
</script>
