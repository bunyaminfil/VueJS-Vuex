import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import store from "../store/index";

const routes = [
  { path: "/", name: "Login", component: Login },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/admission",
    name: "Admission",
    component: () => import("../views/Admission.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next("/");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
