import request from "../request";

function httpGetStorageProducts(page, page_size, filters) {
  return request.get(
    `/api/storage-products/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetStorageProductOne(id) {
  return request.get(`/api/storage-products/${id}/`);
}

function httpPostStorageProduct(data) {
  return request.post(`/api/storage-products/`, data);
}

function httpUpdateStorageProduct({ id, data }) {
  return request.put(`/api/storage-products/${id}/`, data);
}

function httpDeleteStorageProduct(id) {
  return request.delete(`/api/storage-products/${id}/`);
}

export {
  httpDeleteStorageProduct,
  httpUpdateStorageProduct,
  httpPostStorageProduct,
  httpGetStorageProductOne,
  httpGetStorageProducts,
};
