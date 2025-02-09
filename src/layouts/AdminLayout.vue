<template>
  <v-app>
    <admin-header />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AdminHeader from "@/components/AdminPage/AdminHeader.vue";

export default {
  name: "AdminLayout",
  components: {
    AdminHeader,
  },
  data: () => ({
    drawer: true,
    pageTitle: 'Admin Dashboard'
  })
};
</script>
