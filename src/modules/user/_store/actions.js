/* eslint-disable no-unused-vars */
import {
  apiGetUsers,
  apiGetMinimalUsers,
  apiGetUser,
  apiInviteUser
} from "../_util/api";
import * as TYPES from "@/store/types.js";

const actions = {
  getUsers({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiGetUsers(params)
        .then(response => {
          commit(TYPES.SET_USERS, {
            page: response.data.page,
            page_size: response.data.page_size,
            result_count: response.data.result_count,
            last_page: response.data.last_page,
            users: response.data.data
          });
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  getMinimalUsers({ commit }) {
    return new Promise((resolve, reject) => {
      apiGetMinimalUsers()
        .then(response => {
          commit(TYPES.SET_MINIMAL_USERS, response.data);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  getUser({ commit }, uuid) {
    return new Promise((resolve, reject) => {
      apiGetUser(uuid)
        .then(response => {
          commit(TYPES.SET_USER, response.data);
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  // updateUser({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     apiUpdateUser(payload)
  //       .then(response => {
  //         commit(TYPES.SET_USER, response.data);
  //         resolve(response);
  //       })
  //       .catch(error => reject(error));
  //   });
  // },

  inviteUser({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiInviteUser(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },

  // deleteUser(uuid) {
  //   return new Promise((resolve, reject) => {
  //     apiDeleteUser(uuid)
  //       .then(response => {
  //         resolve(response);
  //       })
  //       .catch(error => reject(error));
  //   });
  // }
};

export default actions;
