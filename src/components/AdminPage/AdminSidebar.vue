<template>
  <v-navigation-drawer v-model="drawerLocal" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Travel Admin
        </v-list-item-title>
        <v-list-item-subtitle>
          Quản lý Website Du lịch
        </v-list-item-subtitle>
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
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SidebarAdmin',
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    menuItems: [
      { title: 'Bảng điều khiển', icon: 'mdi-view-dashboard', route: '/admin' },
      { title: 'Đặt chỗ', icon: 'mdi-calendar-check', route: '/admin/bookings' },
      { title: 'Điểm đến', icon: 'mdi-map-marker', route: '/admin/destinations' },
      { title: 'Khách hàng', icon: 'mdi-account-group', route: '/admin/customers' },
      { title: 'Báo cáo', icon: 'mdi-chart-bar', route: '/admin/reports' },
      { title: 'Cài đặt', icon: 'mdi-cog', route: '/admin/settings' },
    ]
  }),
  computed: {
    drawerLocal: {
      get() {
        return this.drawer
      },
      set(value) {
        this.$emit('update:drawer', value)
      }
    }
  }
}
</script>