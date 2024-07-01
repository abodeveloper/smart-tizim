import request from "../request";

function httpGetAllStorages() {
  return request.get(`/api/all_storages/`);
}

function httpGetStorages(page, page_size, filters) {
  return request.get(
    `/api/storages/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetStorageOne(id) {
  return request.get(`/api/storages/${id}/`);
}

function httpPostStorage(data) {
  return request.post(`/api/storages/`, data);
}

function httpUpdateStorage({ id, data }) {
  return request.put(`/api/storages/${id}/`, data);
}

function httpDeleteStorage(id) {
  return request.delete(`/api/storages/${id}/`);
}

export {
  httpGetAllStorages,
  httpGetStorages,
  httpGetStorageOne,
  httpPostStorage,
  httpUpdateStorage,
  httpDeleteStorage,
};
