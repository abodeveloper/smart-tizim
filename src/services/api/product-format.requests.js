import request from "./request";

function httpGetAllProductFormats() {
  return request.get(`/api/all_formats/`);
}

function httpGetProductFormats(page, page_size, filters) {
  return request.get(
    `/api/formats/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

export { httpGetAllProductFormats, httpGetProductFormats };
