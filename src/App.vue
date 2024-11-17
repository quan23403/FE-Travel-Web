<template>
  <v-app>
    <AppHeader />
    <v-main>
      <router-view></router-view>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
  },

  data: () => ({
  }),
}
</script>
