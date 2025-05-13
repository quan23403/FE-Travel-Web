import { createRouter, createWebHistory } from "vue-router";

// Import các component
import HomepageView from "@/view/HomepageView.vue";
import TravelDetail from "@/view/TravelDetail.vue";
import HomePageLayout from "@/layouts/HomePageLayout.vue";
import AdminDashboard from "@/view/AdminDashboard.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import TourManagement from "@/view/AddTour.vue";
import ScheduleList from "@/components/AdminPage/Schedule/ScheduleList.vue";
import TravelPaymentPage from "@/components/PaymentPage/TravelPaymentPage.vue";
import BookingTour from "@/components/AdminPage/BookingTour/BookingTour.vue";
import ListTour from "@/view/ListTour.vue";
import EditTour from "@/view/EditTour.vue";
import PaymentVnpayResult from "@/components/PaymentPage/PaymentVnpayResult.vue";
import CallBack from "@/components/AuthPage/CallBack.vue";
import HistoryPage from "@/components/History/HistoryPage.vue";
import UserManagement from "@/components/AdminPage/UserManagement/UserManagement.vue";
// Định nghĩa các route
const routes = [
  {
    path: "/",
    component: HomePageLayout,
    children: [
      { path: "", component: HomepageView },
      { path: "tour/:id", component: TravelDetail},
      { path: "payment/:scheduleId", name:"payment", component: TravelPaymentPage},
      {path: "payment/payment-callback", name:"paymentCallback", component: PaymentVnpayResult},
      {path: "callback", name:"callback", component: CallBack},
      {path: "history", name:"history", component: HistoryPage},
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        component: AdminDashboard,
      },
      {
        path: "tour/add",
        name: "addTour",
        component: TourManagement,
      },
      {
        path: "bookings",
        component: BookingTour,
      },
      {
        path: "schedules",
        component: ScheduleList,
      },
      {
        path: "tour",
        component: ListTour,
      },
      {
        path: "tour/:id",
        name: "editTour",
        component: EditTour,
      },
      {
        path: "users",
        name: "userManagement",
        component: UserManagement,
      },
    ],
  },
];

// Tạo router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Nếu có savedPosition (ví dụ khi sử dụng nút back hoặc forward), sử dụng nó
    if (savedPosition) {
      return savedPosition;
    } else {
      // Cuộn trang về đầu
      return { top: 0 };
    }
  }
});
export default router;
