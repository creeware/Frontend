import Vue from 'vue';
import Vuex from 'vuex';

import authentication from '@/modules/authentication/_store'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authentication
  }
});

export default store;