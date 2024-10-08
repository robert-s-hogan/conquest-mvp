import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/Home.vue";
import Login from "@/views/Login/Login.vue";
import Dashboard from "@/views/Dashboard/Dashboard.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { auth } from "@/firebase/firebase";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [{ path: "", component: Home }],
  },
  {
    path: "/login",
    component: DefaultLayout,
    children: [{ path: "", component: Login }],
  },
  {
    path: "/dashboard",
    component: AuthLayout,
    meta: { requiresAuth: true },
    children: [{ path: "", component: Dashboard }],
  },
  // Add more authenticated routes here...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next("/");
  } else {
    next();
  }
});

export default router;
