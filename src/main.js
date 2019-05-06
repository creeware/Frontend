import Vue from "vue";
import Vuex from "vuex";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import { VueAuthenticate } from "vue-authenticate";
import store from "@/store";
import "@/assets/style/app.scss";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css' 

window.axios = require("axios");

Vue.prototype.$http = window.axios;
Vue.prototype.$http.defaults.withCredentials = true;

window.EventBus = new Vue();

Vue.prototype.$http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      vueAuthenticate.logout().then(() => router.push({ name: "login" }));
    }
    return Promise.reject(error.response);
  }
);

const vueAuthenticate = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: "auth/", // Your API domain
  tokenPath: "access_token",
  tokenName: "access_token",
  tokenPrefix: "",
  tokenHeader: "Authorization",
  tokenType: "Bearer",

  bindResponseInterceptor: function() {
    this.$http.interceptors.response.use(response => {
      this.setToken(response);
      return response;
    });
  },

  bindRequestInterceptor: function($auth) {
    const tokenHeader = $auth.options.tokenHeader;
    $auth.$http.interceptors.request.use(config => {
      if ($auth.isAuthenticated()) {
        config.headers[tokenHeader] = [
          $auth.options.tokenType,
          $auth.getToken()
        ].join(" ");
      } else {
        delete config.headers[tokenHeader];
      }
      return config;
    });
  },

  providers: {
    github: {
      redirectUri:
        process.env.NODE_ENV == "development"
          ? process.env.VUE_APP_SERVER_CALLBACK_URL
          : "https://creeware.com/callback", // client app URL
      clientId: process.env.VUE_APP_GITHUB_OAUTH_KEY,
      name: "gitlab",
      url: "/github",
      scope: ["user:email user repo admin:org admin:org_hook delete_repo"],
      scopeDelimiter: " ",
      oauthType: "2.0"
    }
  }
});

Vue.use(VueAxios, window.axios);
Vue.use(Vuex);
Vue.use(Vuetify, {
  iconfont: "md"
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export { vueAuthenticate };
