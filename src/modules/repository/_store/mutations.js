import * as TYPES from "@/store/types.js";

const mutations = {
  [TYPES.SET_REPOSITORY](state, payload) {
    state.repository = payload;
  },
  [TYPES.SET_REPOSITORIES](state, payload) {
    state.repositories = payload;
  },
  [TYPES.SET_MINIMAL_REPOSITORIES](state, payload) {
    state.minimal_repositories = payload;
  },
  [TYPES.CLEAR_REPOSITORIES](state) {
    state.repositories = [];
  }
};
export default mutations;
