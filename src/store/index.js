import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authStatus: "",
    token: localStorage.getItem("token") || "",
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.authStatus = "loading";
    },
    auth_success(state, { token, user }) {
      state.authStatus = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.authStatus = "error";
    },
    signout(state) {
      state.authStatus = "";
      state.token = "";
    }
  },
  actions: {
    signin({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "user/signin",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data.user;
            console.log(user);
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", { token, user });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    signup({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "user",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    signout({ commit }) {
      return new Promise(resolve => {
        commit("signout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  getters: {
    isSignedIn: state => !!state.token,
    authStatus: state => state.authStatus
  },
  modules: {}
});
