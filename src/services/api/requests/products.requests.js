import request from "../request";

function httpGetProducts(page, page_size, filters) {
  return request.get(
    `/api/products/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetProductOne(id) {
  return request.get(`/api/products/${id}/`);
}

function httpPostProduct(data) {
  return request.post(`/api/product_create/`, data);
}

function httpUpdateProduct({ id, data }) {
  return request.put(`/api/products/${id}/`, data);
}

function httpDeleteProduct(id) {
  return request.delete(`/api/products/${id}/`);
}

export {
  httpGetProducts,
  httpGetProductOne,
  httpPostProduct,
  httpUpdateProduct,
  httpDeleteProduct,
};
