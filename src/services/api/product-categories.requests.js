import request from "./request";

function httpGetAllProductCategories(page, page_size, filters) {
  return request.get(
    `/api/all_categories/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetProductCategories(page, page_size, filters) {
  return request.get(
    `/api/categories/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

export { httpGetAllProductCategories, httpGetProductCategories };
