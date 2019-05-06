import {
  apiGetRepositories,
  apiGetMinimalRepositories,
  apiGetRepository,
  apiUpdateRepository,
  apiDeleteRepository,
  apiCreateRepository
} from "../_util/api";
import * as TYPES from "@/store/types.js";

const actions = {
  getRepositories({ commit, state }, params) {
    if (state.repositories.page_size !== params.page_size) {
      commit(TYPES.CLEAR_REPOSITORIES);
    }
    return new Promise((resolve, reject) => {
      apiGetRepositories(params)
        .then(response => {
          commit(TYPES.SET_REPOSITORIES, {
            page: response.data.page,
            page_size: response.data.page_size,
            result_count: response.data.result_count,
            last_page: response.data.last_page,
            repositories: response.data.data
          });
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  getMinimalRepositories({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      apiGetMinimalRepositories(params)
        .then(response => {
          commit(TYPES.SET_MINIMAL_REPOSITORIES, response.data);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  getRepository({ commit }, uuid) {
    return new Promise((resolve, reject) => {
      apiGetRepository(uuid)
        .then(response => {
          commit(TYPES.SET_REPOSITORY, response.data);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  updateRepository({ commit }, payload) {
    return new Promise((resolve, reject) => {
      apiUpdateRepository(payload)
        .then(response => {
          commit(TYPES.SET_REPOSITORY, response.data);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  updateRepository({ commit }, payload) {
    return new Promise((resolve, reject) => {
      apiCreateRepository(payload)
        .then(response => {
          commit(TYPES.SET_REPOSITORY, response.data);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  deleteRepository(uuid) {
    return new Promise((resolve, reject) => {
      apiDeleteRepository(uuid)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  }
};

export default actions;
