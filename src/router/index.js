import { createRouter, createWebHistory } from "vue-router";

// Import các component
import HomepageView from "@/view/HomepageView.vue";
import TravelDetail from "@/view/TravelDetail.vue";
import HomePageLayout from "@/layouts/HomePageLayout.vue";
import AdminDashboard from "@/view/AdminDashboard.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import TourManagement from "@/view/TourManagement.vue";
import TravelPaymentPage from "@/components/PaymentPage/TravelPaymentPage.vue";
// Định nghĩa các route
const routes = [
  {
    path: "/",
    component: HomePageLayout,
    children: [
      { path: "", component: HomepageView },
      { path: "tour/:id", component: TravelDetail },
      { path: "tour/payment", component: TravelPaymentPage},
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "dashboard",
        component: AdminDashboard,
      },
      {
        path: "tour",
        component: TourManagement,
      },
    ],
  },
];

// Tạo router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes, // Các route
});

export default router;
