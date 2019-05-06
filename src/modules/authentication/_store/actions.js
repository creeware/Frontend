import { vueAuthenticate } from "@/main.js";
import { jwtDecoder } from "@/utils";
import { apiGetProfile, apiUpdateProfile } from "../_util/api";
import * as TYPES from "@/store/types.js";
import router from "../../../router";

const actions = {
  login({ commit, dispatch }, provider) {
    return new Promise((resolve, reject) => {
      vueAuthenticate
        .authenticate(provider)
        .then(response => {
          vueAuthenticate.setToken(response.data);
          const token = window.localStorage.getItem(
            "vue-authenticate.access_token"
          );
          const profileId = jwtDecoder(token)["user_id"];
          dispatch("getProfile", profileId).then(res => {
            router.push({ name: "dashboard" });
            resolve(response);
          });
        })
        .catch(error => reject(error));
    });
  },

  logout() {
    return new Promise((resolve, reject) => {
      vueAuthenticate
        .logout()
        .then(response => {
          resolve(response);
          router.push({ name: "login" });
        })
        .catch(error => reject(error));
    });
  },

  getProfile({ commit }, uuid) {
    return new Promise((resolve, reject) => {
      apiGetProfile(uuid)
        .then(response => {
          commit(TYPES.SET_PROFILE, response.data);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  updateProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      apiUpdateProfile(payload)
        .then(response => {
          commit(TYPES.SET_PROFILE, response.data);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  }


};

export default actions;
