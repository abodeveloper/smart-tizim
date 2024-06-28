import request from "./request";

function httpGetAllProductFormats(page, page_size, filters) {
  return request.get(
    `/api/all_formats/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetProductFormats(page, page_size, filters) {
  return request.get(
    `/api/formats/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

export { httpGetAllProductFormats, httpGetProductFormats };
