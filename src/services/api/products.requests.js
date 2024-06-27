import request from "./request";

function httpGetProducts(page, page_size) {
  return request.get(`/api/products/?page=${page}&page_size=${page_size}`);
}

export { httpGetProducts };
