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
  },
  {
    path: "/signin",
    name: "Sign In",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignIn.vue")
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignUp.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
