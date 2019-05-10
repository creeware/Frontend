import * as TYPES from "@/store/types.js";

const mutations = {
  [TYPES.SET_REPOSITORY](state, payload) {
    state.repository = payload;
  },
  [TYPES.SET_REPOSITORIES](state, payload) {
    state.repositories = payload.repositories;
    state.repositoriesMeta = {
      page: payload.page,
      page_size: payload.page_size,
      result_count: payload.result_count,
      last_page: payload.last_page
    };
  },
  [TYPES.SET_SOLUTION_REPOSITORIES](state, payload) {
    state.solution_repositories = payload;
  },
  [TYPES.SET_TEMPLATE_REPOSITORIES](state, payload) {
    state.template_repositories = payload;
  },

  [TYPES.SET_MINIMAL_REPOSITORIES](state, payload) {
    state.minimal_repositories = payload;
  },
  [TYPES.CLEAR_REPOSITORIES](state) {
    state.repositories = [];
  },
  [TYPES.SET_CANVAS_COURSES](state, payload){
    state.canvas_courses = payload;
  },
  [TYPES.SET_CANVAS_STUDENTS](state, payload) {
    state.canvas_students = payload;
  }
};
export default mutations;
