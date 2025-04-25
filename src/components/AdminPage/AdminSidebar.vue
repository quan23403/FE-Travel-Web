<template>
  <v-navigation-drawer v-model="drawerLocal" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Travel Admin </v-list-item-title>
        <v-list-item-subtitle> Quản lý Website Du lịch </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.route"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Quản lý tour (Nested Menu) -->
      <v-menu v-if="item.title === 'Quản lý tour'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-list>
          <!-- Mục con "Thêm tour" -->
          <v-list-item :to="'/admin/tour/add'" link>
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Thêm tour</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Mục con "Sửa tour" -->
          <v-list-item :to="'/admin/tour/edit'" link>
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sửa tour</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from "vue";

const drawer = ref(true); // Trạng thái của sidebar
const menuItems = [
  { title: "Bảng điều khiển", icon: "mdi-view-dashboard", route: "/admin" },
  { title: "Đặt chỗ", icon: "mdi-calendar-check", route: "/admin/bookings" },
  { title: "Quản lý tour", icon: "mdi-map-marker", route: "/admin/tour" },
  { title: "Khách hàng", icon: "mdi-account-group", route: "/admin/customers" },
  { title: "Báo cáo", icon: "mdi-chart-bar", route: "/admin/reports" },
  { title: "Cài đặt", icon: "mdi-cog", route: "/admin/settings" },
];

// Computed để xử lý việc cập nhật trạng thái sidebar
const drawerLocal = computed({
  get() {
    return drawer.value;
  },
  set(value) {
    drawer.value = value;
  },
});
</script>
