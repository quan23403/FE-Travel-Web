<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">
        {{ status }}
      </h1>
      <p v-if="error" class="text-red-500 text-center mb-4">{{ error }}</p>
      <div v-if="loading" class="flex justify-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"
        ></div>
      </div>
      <p v-if="success" class="text-green-500 text-center mb-4">
        Authentication successful! Redirecting...
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { callBackGoogle } from "@/api/api";
const router = useRouter();
const route = useRoute();

const status = ref("Processing OAuth Callback");
const loading = ref(true);
const error = ref(null);
const success = ref(false);

onMounted(async () => {
  try {
    const code = route.query.code;

    if (!code) {
      throw new Error("No authorization code found in URL");
    }

    const response = await callBackGoogle(code);
    const token = response.data.data.accessToken;
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    // Store the access token (e.g., in localStorage)
    success.value = true;
    status.value = "Authentication Successful";
    // Redirect to the main application after a short delay
    setTimeout(() => {
      router.push("/").then(() => {
        window.location.reload(); // Reload trang sau khi chuyển đến route mới
      });
    }, 500);
  } catch (err) {
    error.value = err.message;
    status.value = "Authentication Failed";
  } finally {
    loading.value = false;
  }
});
</script>
