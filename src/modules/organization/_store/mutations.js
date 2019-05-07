import * as TYPES from "@/store/types.js";

const mutations = {
  [TYPES.SET_ORGANIZATION](state, payload) {
    state.organization = payload;
  },
  [TYPES.SET_ORGANIZATIONS](state, payload) {
    state.organizations = payload.organizations;
    state.organizationsMeta = {
      page: payload.page,
      page_size: payload.page_size,
      result_count: payload.result_count,
      last_page: payload.last_page
    };
  },
  [TYPES.SET_MINIMAL_ORGANIZATIONS](state, payload) {
    state.minimal_organizations = payload;
  },
  [TYPES.CLEAR_ORGANIZATIONS](state) {
    state.organizations = [];
  },
  [TYPES.SET_IMPORTED_REPOSITORIES](state, payload) {
    state.imported_repositories = payload;
  }
};

export default mutations;
