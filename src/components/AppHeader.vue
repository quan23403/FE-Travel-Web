<template>
  <v-navigation-drawer v-model="drawer" color="primary" disable-resize-watcher>
    <v-list nav>
      <v-list-item v-for="item in items" :key="item" link :title="item" />
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
      <v-avatar image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png" />
    </div>

    <div class="d-md-flex d-none ga-4 mx-auto">
      <v-btn v-for="item in items" :key="item" class="text-none" :text="item" />
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
              img="user.avatar ||
                  'https://vuetifyjs.b-cdn.net/docs/images/logos/v.png'"
              size="40"
              class="ms-auto"
              v-bind="props"
            >
            </v-avatar>
          </template>
          <v-list>
            <v-list-item @click="goToProfile">
              <v-list-item-content>
                <v-list-item-title>{{ user.email }}</v-list-item-title>
                <v-list-item-title>{{ user.userName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="goToAccountSettings">
              <v-list-item-content>
                <v-list-item-title>Settings & Privacy</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="goToHelpSupport">
              <v-list-item-content>
                <v-list-item-title>Help & Support</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-content>
                <v-list-item-title>Log Out</v-list-item-title>
              </v-list-item-content>
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
import { shallowRef, ref, computed } from "vue";
import LoginClient from "./AuthPage/LoginClient.vue";
import router from "@/router";

const drawer = shallowRef(false);
const loginDialog = ref(false);
const items = ["Products", "Services", "About", "Contact"];

const isLoggedIn = computed(() => {
  return !!localStorage.getItem("accessToken"); // Kiểm tra nếu có accessToken trong localStorage
});

// Lấy thông tin người dùng từ localStorage
const user = computed(() => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  return userInfo || {};
});

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  // Handle logout (e.g., redirect, show message, etc.)
  router.push("/");
  console.log("User logged out successfully");
};

const openLoginRegister = () => {
  console.log("Login/Register dialog opened", loginDialog.value);
  loginDialog.value = true;
};
const handleAuthSuccess = (response) => {
  console.log("User authenticated successfully", response.data.user);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  localStorage.setItem("accessToken", response.data.accessToken);
  loginDialog.value = false;
  // Handle successful authentication (e.g., redirect, show message, etc.)
};
</script>
