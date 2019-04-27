import { vueAuthenticate } from "@/main.js"

const actions = {
  login( { commit }, provider) {
    
    return new Promise (() => {
      vueAuthenticate.authenticate(provider).then(response => {
        vueAuthenticate.setToken(response.data)
        commit("SET_AUTHENTICATED", {
          isAuthenticated: vueAuthenticate.isAuthenticated()
        });
      })
    })
  }
};

export default actions;
