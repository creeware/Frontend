export function apiGetRepositories(params) {
    const url = `/api/repositories/list/`;
    return axios.get(url, {params});
}
export function apiGetMinimalRepositories() {
    const url = `/api/repositories/minimal_list/`;
    return axios.get(url);
}
export function apiGetRepository(uuid) {
    const url = `/api/repositories/${uuid}`;
    return axios.get(url, uuid);
}

export function apiUpdateRepository(updatedRepository) {
    const url = `/api/repositories/patch`;
    return axios.patch(url, updatedRepository);
}

export function apiDeleteRepository(uuid) {
    const url = `/api/repositories/${uuid}`
    return axios.delete(url);
}

export function apiCreateRepository(repository){
    const url = `/api/repositories/post`
    return axios.post(url, repository);
}
