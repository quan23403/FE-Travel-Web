<template>
  <v-app>
    <AppHeader />
    <v-main class="main-content">
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
export default {
  name: "HomePageLayout",

  components: {
    AppHeader,
    AppFooter,
  },

  data: () => ({}),
};
</script>

<style scoped>
/* Ensure the layout uses full height of the screen */
.v-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Make sure the container fills the entire viewport height */
}

/* Main content area should take the remaining space */
.main-content {
  flex: 1; /* Makes this section take up the remaining space */
}
</style>
