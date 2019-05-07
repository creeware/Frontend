/* eslint-disable no-undef */
export function apiGetOrganizations(params) {
    const url = `/api/organizations/list/`;
    return axios.get(url, {params});
}
export function apiGetMinimalOrganizations() {
    const url = `/api/organizations/minimal_list/`;
    return axios.get(url);
}

export function apiGetOrganization(uuid) {
    const url = `/api/organizations/${uuid}`;
    return axios.get(url);
}

export function apiUpdateOrganization(updatedOrganization) {
    const url = `/api/organizations/patch/`;
    return axios.patch(url, updatedOrganization);
}

export function apiDeleteOrganization(uuid) {
    const url = `/api/organizations/${uuid}`
    return axios.delete(url);
}

export function apiImportOrganization(organization_name){
    const url = `/api/organizations/import/`
    return axios.post(url, { organization_name });
}
