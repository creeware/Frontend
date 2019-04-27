const mutations = {
  ["SET_AUTHENTICATED"](state, payload) {
    state.isAuthenticated = payload.isAuthenticated;
  }
};

export default mutations;
