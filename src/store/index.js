import Vue from "vue";
import Vuex from "vuex";

import authentication from "@/modules/authentication/_store";
import organization from "@/modules/organization/_store";
import repository from "@/modules/repository/_store";
import user from "@/modules/user/_store";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authentication,
    organization,
    repository,
    user
  }
});

export default store;
