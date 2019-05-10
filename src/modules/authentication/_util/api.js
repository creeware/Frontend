/* eslint-disable no-undef */
export function apiGetProfile(profileId) {
    const url = `/api/users/${profileId}`;
    return axios.get(url);
}

export function apiGetProfileStatistics(uuid) {
    const url = `/api/statistics/profile/${uuid}`;
    return axios.get(url);
}

export function apiUpdateProfile(updatedProfile) {
    const url = `/api/users/patch`;
    return axios.patch(url, updatedProfile);
}

export function apiCanvasMigration(payload){
    const url = `/api/canvas/migration/`
    return axios.post(url, payload);
}

export function apiCanvasIntegration(payload){
    const url = `/api/canvas/integration/`
    return axios.post(url, payload);
}