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
import NotFound from "@/components/NotFound.vue";
import ServicePage from "@/components/subpage/ServicePage.vue";
import AboutPage from "@/components/subpage/AboutPage.vue";
import ContactPage from "@/components/subpage/ContactPage.vue";
// Định nghĩa các route
const routes = [
  {
    path: "/",
    component: HomePageLayout,
    children: [
      { path: "/", component: HomepageView, name: "home" },
      { path: "tour/:id", component: TravelDetail},
      { path: "payment/:scheduleId", name:"payment", component: TravelPaymentPage},
      {path: "payment/payment-callback", name:"paymentCallback", component: PaymentVnpayResult},
      {path: "callback", name:"callback", component: CallBack},
      {path: "history", name:"history", component: HistoryPage},
      {path: "services", name:"services", component: ServicePage},
      {path: "about", name:"about", component: AboutPage},
      {path: "contact", name:"contact", component: ContactPage},
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true, roles: ['ADMIN', 'TOUR_GUIDE', 'EMPLOYEE'] },
    children: [
      {
        path: "dashboard",
        component: AdminDashboard,
      },
      {
        path: "tour/add",
        name: "addTour",
        component: TourManagement,
        meta: { roles: ['ADMIN'] },
      },
      {
        path: "bookings",
        component: BookingTour,
        meta: { roles: ['ADMIN', 'EMPLOYEE'] },
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
        meta: { roles: ['ADMIN'] },
      },
      {
        path: "users",
        name: "userManagement",
        component: UserManagement,
        meta: { roles: ['ADMIN'] },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  }
];

// Tạo router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; 
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = Boolean(localStorage.getItem('accessToken')) // hoặc cách check auth khác
  const userStr = localStorage.getItem("user");
  let roles = [];
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      roles = user.roles || [];
      console.log("Roles:", roles);
    } catch (error) {
      console.error("Lỗi parse user từ localStorage:", error);
    }
  }
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Người dùng chưa đăng nhập mà vào route cần auth
    next({ name: 'NotFound' }) // chuyển về trang 404
  } else if (to.meta.roles && to.meta.roles.length > 0) {
    // Nếu route có yêu cầu role, kiểm tra user có role phù hợp không
    const hasRole = to.meta.roles.some(role => roles.includes(role))
    if (!hasRole) {
      // Không có quyền truy cập
      next({ name: 'NotFound' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
