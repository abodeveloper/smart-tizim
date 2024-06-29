import request from "./request";

function httpGetProducts(page, page_size, filters) {
  return request.get(
    `/api/products/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpPostProduct() {
  return request.post(`/api/products/`);
}

export { httpGetProducts, httpPostProduct };
