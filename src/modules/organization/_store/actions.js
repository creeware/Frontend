/* eslint-disable */
import {
  apiGetOrganizations,
  apiGetMinimalOrganizations,
  apiGetOrganization,
  apiUpdateOrganization,
  apiDeleteOrganization,
  apiImportOrganization
} from "../_util/api";
import * as TYPES from "@/store/types.js";

const actions = {
  getOrganizations({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiGetOrganizations(params)
        .then(response => {
          commit(TYPES.SET_ORGANIZATIONS, {
            page: response.data.page,
            page_size: response.data.page_size,
            result_count: response.data.result_count,
            last_page: response.data.last_page,
            organizations: response.data.data
          });
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  getMinimalOrganizations({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiGetMinimalOrganizations(params)
        .then(response => {
          commit(TYPES.SET_MINIMAL_ORGANIZATIONS, response.data);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  getOrganization({ commit }, uuid) {
    return new Promise((resolve, reject) => {
      apiGetOrganization(uuid)
        .then(response => {
          commit(TYPES.SET_ORGANIZATION, response.data);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  updateOrganization({ commit }, payload) {
    return new Promise((resolve, reject) => {
      apiUpdateOrganization(payload)
        .then(response => {
          commit(TYPES.SET_ORGANIZATION, response.data);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  importOrganization({ commit }, params) {
    commit(TYPES.CLEAR_IMPORTED_REPOSITORIES)
    return new Promise((resolve, reject) => {
      apiImportOrganization(params)
        .then(response => {
          commit(TYPES.SET_IMPORTED_REPOSITORIES, response.data);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  deleteOrganization(uuid) {
    return new Promise((resolve, reject) => {
      apiDeleteOrganization(uuid)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  }
};

export default actions;
