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
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar
          size="32"
          class="ms-auto"
          v-bind="props"
          :image="getAvatarUrl(user.avatar ?? 'default.png')"
        ></v-avatar>
      </template>
      <v-list>
        <v-list-item
          @click="
            () => {
              router.push('/');
            }
          "
        >
          <v-list-item-title>Trang Chủ</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-title>Đăng xuất</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app>
    <v-list dense nav>
      <v-list-item
        v-for="item in filteredMenuItems"
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

<script setup>
import { ref, defineProps } from "vue";
import router from "@/router";
const props = defineProps({
  title: {
    type: String,
    default: "Admin Dashboard",
  },
});

const drawer = ref(false);

const menuItems = [
  {
    title: "Báo cáo",
    icon: "mdi-chart-bar",
    route: "/admin/dashboard",
    roles: ["ADMIN", "EMPLOYEE", "TOUR_GUIDE"],
  },
  {
    title: "Đặt chỗ",
    icon: "mdi-calendar-check",
    route: "/admin/bookings",
    roles: ["ADMIN", "EMPLOYEE"],
  },
  {
    title: "Danh sách Tour",
    icon: "mdi-map-marker",
    route: "/admin/tour",
    roles: ["ADMIN", "EMPLOYEE", "TOUR_GUIDE"],
  },
  {
    title: "Người dùng",
    icon: "mdi-account-group",
    route: "/admin/users",
    roles: ["ADMIN"],
  },
  {
    title: "Lịch trình",
    icon: "mdi-calendar-clock",
    route: "/admin/schedules",
    roles: ["ADMIN", "EMPLOYEE", "TOUR_GUIDE"],
  },
];

const getAvatarUrl = (filename) => {
  if (filename.startsWith("http") || filename.startsWith("https")) {
    return filename;
  }

  // Nếu là default.png, trả về ảnh mặc định
  return filename === "default.png"
    ? "https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
    : `http://localhost:8080/upload/${filename}`;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  router.push("/");
};
const user = JSON.parse(localStorage.getItem("user")) || {};

const filteredMenuItems = menuItems.filter((item) =>
  item.roles.some((role) => user.roles.includes(role))
);
</script>
