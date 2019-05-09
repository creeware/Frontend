/* eslint-disable no-undef */
export function apiGetUsers(params) {
    const url = `/api/users/list/`;
    return axios.get(url, {params});
}

export function apiGetMinimalUsers() {
    const url = `/api/users/minimal_list/`;
    return axios.get(url);
}

export function apiGetUser(uuid) {
    const url = `/api/users/${uuid}`;
    return axios.get(url);
}

export function apiInviteUser(payload){
    const url = `/api/users/invite/`
    return axios.post(url, payload);
}
