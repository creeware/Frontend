import { vueAuthenticate } from "@/main.js"
import router from "../../../router";

const actions = {
  login( { commit }, provider) {
    
    return new Promise (() => {
      vueAuthenticate.authenticate(provider).then(response => {
        vueAuthenticate.setToken(response.data)
        commit("SET_AUTHENTICATED", {
          isAuthenticated: vueAuthenticate.isAuthenticated()
        });
        router.push({ name: "dashboard" });
      })
    })
  }
};

export default actions;
