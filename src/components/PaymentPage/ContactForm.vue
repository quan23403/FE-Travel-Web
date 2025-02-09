<template>
  <v-card class="mb-4">
    <v-card-title class="text-h5 font-weight-bold primary--text">
      Contact Information
    </v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="firstName"
              label="First Name"
              :rules="[(v) => !!v || 'First name is required']"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="lastName"
              label="Last Name"
              :rules="[(v) => !!v || 'Last name is required']"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              label="Email"
              :rules="[
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
              ]"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="phone"
              label="Phone Number"
              :rules="[(v) => !!v || 'Phone number is required']"
              required
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
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");

const emit = defineEmits(["update:contactInfo"]);

watch([firstName, lastName, email, phone], () => {
  emit("update:contactInfo", {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
  });
});

const submitForm = () => {
  form.value.validate();
};
</script>
