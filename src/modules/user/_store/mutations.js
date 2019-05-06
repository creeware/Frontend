import * as TYPES from "@/store/types.js";

const mutations = {
  [TYPES.SET_USER](state, payload) {
    state.user = payload;
  },
  [TYPES.SET_USERS](state, payload) {
    state.users = payload.users;
    state.usersMeta = {
      page: payload.page,
      page_size: payload.page_size,
      result_count: payload.result_count,
      last_page: payload.last_page
    };
  },
  [TYPES.SET_MINIMAL_USERS](state, payload) {
    state.minimal_users = payload;
  },
  [TYPES.CLEAR_USERS](state) {
    state.users = [];
  }
};

export default mutations;
