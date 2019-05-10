import * as TYPES from "@/store/types.js";

const mutations = {
  [TYPES.SET_PROFILE](state, payload) {
    state.profile = payload;
  },
  [TYPES.SET_PROFILE_STATISTICS](state, payload) {
    state.profile_statistics = payload
  }
};

export default mutations;
