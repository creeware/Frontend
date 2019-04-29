import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import App from './App.vue'
import router from './router'
import { VueAuthenticate } from 'vue-authenticate'
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.prototype.$http = Axios
Vue.prototype.$http.defaults.withCredentials = true

const vueAuthenticate = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: '', // Your API domain
  tokenPath: 'access_token',
  tokenName: 'access_token',
  tokenPrefix: '',
  tokenHeader: 'Authorization',
  tokenType: 'Bearer',

  bindResponseInterceptor: function () {
    this.$http.interceptors.response.use((response) => {
      this.setToken(response)
      return response
    })
  },

  bindRequestInterceptor: function ($auth) {
    const tokenHeader = $auth.options.tokenHeader
    $auth.$http.interceptors.request.use((config) => {
      if ($auth.isAuthenticated()) {
        config.headers[tokenHeader] = [
          $auth.options.tokenType, $auth.getToken()
        ].join(' ')
      } else {
        delete config.headers[tokenHeader]
      }
      return config
    })
  },

  providers: {
    oauth2: {
      redirectUri: process.env.NODE_ENV == "development" ? process.env.VUE_APP_SERVER_CALLBACK_URL : "https://creeware.com/auth/callback", // client app URL
      clientId: 43859343045838430,
      url: '/api/authorization',
      name: 'gitlab',
      authorizationEndpoint: '/api/authentication',
      oauthType: '2.0'
    }
  }
})

Vue.use(Vuex)
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

export { vueAuthenticate };
