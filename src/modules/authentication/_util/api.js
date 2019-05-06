export function apiGetProfile(profileId) {
    const url = `/api/users/${profileId}`;
    return axios.get(url);
}

export function apiUpdateProfile(updatedProfile) {
    const url = `/api/users/patch`;
    return axios.patch(url, updatedProfile);
}