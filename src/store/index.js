import { createStore } from "vuex";
import axiosjs from "../config/axios";
import router from "../router/index";

export default createStore({
  state: {
    token: "",
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = "";
    },
  },
  actions: {
    initAuth({ commit }) {
      let token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token);
      } else {
        router.push("");
        return false;
      }
    },
    login({ commit }, authData) {
      return axiosjs
        .post("/users/signin", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((response) => {
          const res = response.data;
          if (res.status == "true") {
            let newToken = response.data.data.access_token;
            commit("setToken", newToken);
            localStorage.setItem("token", newToken);
            alert(res.message);
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    logout({ commit }) {
      commit("clearToken");
      localStorage.removeItem("token");
      router.replace("/");
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== "";
    },
  },
});
