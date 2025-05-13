<template>
  <v-app-bar app color="white" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs }">
        <v-btn icon v-bind="attrs">
          <v-avatar size="32">
            <v-img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="Admin"
            ></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="() => {}">
          <v-list-item-title>Hồ sơ</v-list-item-title>
        </v-list-item>
        <v-list-item @click="() => {}">
          <v-list-item-title>Cài đặt</v-list-item-title>
        </v-list-item>
        <v-list-item @click="() => {}">
          <v-list-item-title>Đăng xuất</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app>
    <v-list dense nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.route"
        link
      >
        <v-icon>{{ item.icon }}</v-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "HeaderAdmin",
  props: {
    title: {
      type: String,
      default: "Admin Dashboard",
    },
  },
  data: () => ({
    drawer: false,
    menuItems: [
      { title: "Báo cáo", icon: "mdi-chart-bar", route: "/admin" },
      {
        title: "Đặt chỗ",
        icon: "mdi-calendar-check",
        route: "/admin/bookings",
      },
      {
        title: "Danh sách Tour",
        icon: "mdi-map-marker",
        route: "/admin/tour",
      },
      {
        title: "Người dùng",
        icon: "mdi-account-group",
        route: "/admin/users",
      },
      {
        title: "Lịch trình",
        icon: "mdi-calendar-clock",
        route: "/admin/schedules",
      },

      { title: "Cài đặt", icon: "mdi-cog", route: "/admin/settings" },
    ],
  }),
};
</script>
