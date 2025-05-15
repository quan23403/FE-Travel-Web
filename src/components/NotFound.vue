<template>
  <div class="not-found">
    <h1>404 - Trang không tồn tại</h1>
    <p>
      Rất tiếc, trang bạn yêu cầu không có hoặc bạn không có quyền truy cập.
    </p>
    <button @click="goHome">Quay về trang trước</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = () => {
  router.back();
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>
