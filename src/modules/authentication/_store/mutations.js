import * as TYPES from "@/store/types.js";

const mutations = {
  [TYPES.SET_PROFILE](state, payload) {
    state.profile = payload;
  }
};

export default mutations;
