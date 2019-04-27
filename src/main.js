import Vue from 'vue'
import App from './App.vue'
import VueAuthenticate from 'vue-authenticate'
import Axios from 'axios'
import router from './router'

Vue.prototype.$http = Axios

Vue.use(VueAuthenticate, {
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
      redirectUri: process.env.VUE_APP_SERVER_CALLBACK_URL, // client app URL
      url: '/authentication',
      name: 'gitlab',
      authorizationEndpoint: '/authentication',
      oauthType: '2.0',
      popupOptions: { width: 1020, height: 618 }
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
