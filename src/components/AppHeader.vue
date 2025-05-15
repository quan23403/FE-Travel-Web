<template>
  <v-navigation-drawer v-model="drawer" color="primary" disable-resize-watcher>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :to="item.route"
        link
        :title="item.title"
      />
    </v-list>
  </v-navigation-drawer>

  <v-app-bar color="white" flat>
    <template #prepend>
      <v-app-bar-nav-icon
        v-if="$vuetify.display.smAndDown"
        @click="drawer = !drawer"
      />
    </template>

    <div class="d-flex flex-1-1-0 ps-md-4">
      <v-btn @click="gotoHomePage">
        <v-avatar image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png" />
      </v-btn>
    </div>

    <div class="d-md-flex d-none ga-4 mx-auto">
      <v-btn
        v-for="item in items"
        :key="item.title"
        class="text-none"
        text
        :to="item.route"
      >
        {{ item.title }}
      </v-btn>
    </div>

    <div class="d-flex flex-1-1-0 pe-3">
      <!-- Nếu chưa đăng nhập, hiển thị nút Login -->
      <template v-if="!isLoggedIn">
        <v-btn
          append-icon="mdi-chevron-right"
          class="ms-auto text-none"
          slim
          text="Login"
          @click="openLoginRegister"
        />
      </template>

      <!-- Nếu đã đăng nhập, hiển thị Avatar và menu -->
      <template v-else>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-avatar
              :image="getAvatarUrl(user.avatar ?? 'default.png')"
              size="40"
              class="ms-auto"
              v-bind="props"
            >
            </v-avatar>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>{{ user.email }}</v-list-item-title>
              <v-list-item-title>{{ user.userName }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="() => router.push('/admin')"
              v-if="canAccessAdmin()"
            >
              <v-list-item-title>Admin Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToBookingHistory">
              <v-list-item-title>Lịch sử đặt tour</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Đăng Xuất</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </div>
  </v-app-bar>

  <!-- Login/Register Dialog -->
  <v-dialog v-model="loginDialog" width="auto">
    <login-client @auth-success="handleAuthSuccess"></login-client>
  </v-dialog>
</template>

<script setup>
import { shallowRef, ref, computed, onMounted } from "vue";
import LoginClient from "./AuthPage/LoginClient.vue";
import router from "@/router";

const drawer = shallowRef(false);
const loginDialog = ref(false);
const items = [
  { title: "Services", route: "/services" },
  { title: "About", route: "/about" },
  { title: "Contact", route: "/contact" },
];

const isLoggedIn = ref(!!localStorage.getItem("accessToken"));

const updateLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem("accessToken");
};

const gotoHomePage = () => {
  router.push("/");
};

onMounted(() => {
  window.addEventListener("storage", updateLoginStatus);
});

// Lấy thông tin người dùng từ localStorage
const user = computed(() => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  return userInfo || {};
});

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  isLoggedIn.value = false;
  router.push("/");
  console.log("User logged out successfully");
};

const openLoginRegister = () => {
  console.log("Login/Register dialog opened", loginDialog.value);
  loginDialog.value = true;
};
const handleAuthSuccess = (response) => {
  console.log("User authenticated successfully", response.user);
  console.log("Access token:", response.accessToken);
  localStorage.setItem("user", JSON.stringify(response.user));
  localStorage.setItem("accessToken", response.accessToken);
  // window.location.reload();
  isLoggedIn.value = true;
  loginDialog.value = false;
};

const goToBookingHistory = () => {
  router.push("/history");
};

const getAvatarUrl = (filename) => {
  if (filename.startsWith("http") || filename.startsWith("https")) {
    return filename;
  }

  // Nếu là default.png, trả về ảnh mặc định
  return filename === "default.png"
    ? "https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
    : `http://localhost:8080/upload/${filename}`;
};

const canAccessAdmin = () => {
  const allowedRoles = ["ADMIN", "EMPLOYEE", "TOUR_GUIDE"];
  return (
    user.value.roles && allowedRoles.some((r) => user.value.roles.includes(r))
  );
};
</script>
