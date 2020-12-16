import Vue from "vue";
import Axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_API_ROOT;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
