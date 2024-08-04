import request from "../request";

function httpGetAllFinanceTrasactions() {
  return request.get(`/api/all_categories/`);
}

function httpGetFinanceTransactions(page, page_size, filters) {
  return request.get(
    `/api/categories/?page=${page}&page_size=${page_size}${
      filters && `&${filters}`
    }`
  );
}

function httpGetFinanceTransactionOne(id) {
  return request.get(`/api/categories/${id}/`);
}

function httpPostFinanceTransaction(data) {
  return request.post(`/api/categories/`, data);
}

function httpUpdateFinanceTransaction({ id, data }) {
  return request.put(`/api/categories/${id}/`, data);
}

function httpDeleteFinanceTransaction(id) {
  return request.delete(`/api/categories/${id}/`);
}

export {
  httpGetAllFinanceTrasactions,
  httpPostFinanceTransaction,
  httpUpdateFinanceTransaction,
  httpDeleteFinanceTransaction,
  httpGetFinanceTransactions,
  httpGetFinanceTransactionOne,
};
