import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/account",
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Account.vue")
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: () =>
      import(/* webpackChunkName: "catalog" */ "../views/Catalog.vue")
  },
  {
    path: "/library",
    name: "Library",
    component: () =>
      import(/* webpackChunkName: "library" */ "../views/Library.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
