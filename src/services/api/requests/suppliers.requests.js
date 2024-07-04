import request from "../request";

function httpGetAllSuppliers() {
  return request.get(`/api/all_suppliers/`);
}

function httpGetSuppliers(page, page_size, filters) {
  return request.get(
    `/api/suppliers/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetSupplierOne(id) {
  return request.get(`/api/suppliers/${id}/`);
}

function httpImportSuppliers(data) {
  return request.post(`/api/import_suppliers/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function httpPostSupplier(data) {
  return request.post(`/api/suppliers/`, data);
}

function httpUpdateSupplier({ id, data }) {
  return request.put(`/api/suppliers/${id}/`, data);
}

function httpDeleteSupplier(id) {
  return request.delete(`/api/suppliers/${id}/`);
}

export {
  httpGetAllSuppliers,
  httpGetSuppliers,
  httpGetSupplierOne,
  httpImportSuppliers,
  httpPostSupplier,
  httpUpdateSupplier,
  httpDeleteSupplier,
};
