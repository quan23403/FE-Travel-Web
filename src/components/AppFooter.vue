<template>
  <v-footer color="primary" dark padless>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h3 class="text-h6 mb-4">TravelVue</h3>
          <p>Your gateway to extraordinary adventures around the world.</p>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="text-h6 mb-4">Quick Links</h3>
          <v-list dense dark>
            <v-list-item v-for="link in links" :key="link.text" :to="link.to">
              {{ link.text }}
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="text-h6 mb-4">Contact Us</h3>
          <p>Email: info@travelvue.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <div class="mt-4">
            <v-btn icon v-for="icon in icons" :key="icon" class="mx-2">
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col cols="12" class="text-center">
          &copy; {{ new Date().getFullYear() }} TravelVue. All rights reserved.
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref } from "vue";

const links = ref([
  { text: "Home", to: "/" },
  { text: "Destinations", to: "/destinations" },
  { text: "About", to: "/about" },
  { text: "Contact", to: "/contact" },
]);

const icons = ref(["mdi-facebook", "mdi-twitter", "mdi-instagram"]);
</script>
