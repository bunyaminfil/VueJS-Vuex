import { createStore } from "vuex";
import axios from "axios";
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
      return axios
        .post("http://localhost:3000/users/signin", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((response) => {
          let newToken = response.data.data.jwtoken;
          console.log(newToken);
          commit("setToken", newToken);
          localStorage.setItem("token", newToken);
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
