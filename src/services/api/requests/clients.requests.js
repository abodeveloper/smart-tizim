import request from "../request";

function httpGetAllClients() {
  return request.get(`/api/all_clients/`);
}

function httpGetClients(page, page_size, filters) {
  return request.get(
    `/api/clients/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetClientOne(id) {
  return request.get(`/api/clients/${id}/`);
}

function httpImportClients(data) {
  return request.post(`/api/import_clients/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function httpPostClient(data) {
  return request.post(`/api/clients/`, data);
}

function httpUpdateClient({ id, data }) {
  return request.put(`/api/clients/${id}/`, data);
}

function httpDeleteClient(id) {
  return request.delete(`/api/clients/${id}/`);
}

export {
  httpGetAllClients,
  httpGetClients,
  httpDeleteClient,
  httpUpdateClient,
  httpImportClients,
  httpPostClient,
  httpGetClientOne,
};
