/* eslint-disable no-undef */
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
    const url = `/api/repositories/patch/`;
    return axios.patch(url, updatedRepository);
}

export function apiDeleteRepository(uuid) {
    const url = `/api/repositories/${uuid}`
    return axios.delete(url);
}

export function apiCreateRepository(repository){
    const url = `/api/repositories/post/`
    return axios.post(url, repository);
}

export function apiGetCanvasCourses(uuid) {
    const url = `/api/canvas/courses/${uuid}`;
    return axios.get(url, uuid);
}

export function apiGetCanvasStudents(params) {
    const url = `/api/canvas/students/`;
    return axios.get(url, { params });
}

export function apiCreateCanvasAssignment(payload){
    const url = `/api/canvas/repository/`
    return axios.post(url, payload);
}

export function apiResetRepository(payload) {
    const url = `/api/repositories/reset/`
    return axios.post(url, payload)
}
