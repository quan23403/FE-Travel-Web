<template>
  <v-app>
    <AppHeader />
    <v-main class="main-content">
      <router-view />
    </v-main>
    <AppFooter />
    <chat-bot style="z-index: 10000" />
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import ChatBot from "@/components/Chatbot/ChatBot.vue";
export default {
  name: "HomePageLayout",

  components: {
    AppHeader,
    AppFooter,
    ChatBot,
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
