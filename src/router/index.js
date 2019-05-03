import { vueAuthenticate } from "@/main";
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
})

router.beforeEach(function(to, from, next) {
  if (to.meta && to.meta.auth !== undefined) {
    if (to.meta.auth) {
      if (vueAuthenticate.isAuthenticated()) {
        next();
      } else {
        router.push({ name: "login" });
      }
    } else {
      if (vueAuthenticate.isAuthenticated()) {
        router.push({ name: "dashboard" });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;