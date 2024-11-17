import { createRouter, createWebHistory } from 'vue-router';

// Import các component
import HomepageView from '@/view/HomepageView.vue';
import TravelDetail from '@/view/TravelDetail.vue';
// Định nghĩa các route
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomepageView
  },
  {
    path: '/tour/detail',
    name: 'DetailPage',
    component: TravelDetail
  }
];

// Tạo router instance
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,                                              // Các route
});

export default router;
