import { formatTimeForApi } from "@/utils/helpers";
import { get } from "lodash";

export function prepareStorageProductDto(item) {
  return {
    storage: Number(get(item, "storage", "")),
    supplier: Number(get(item, "supplier", "")),
    desc: get(item, "desc", ""),
    date: formatTimeForApi(get(item, "date", "")),

    cash: get(item, "cash", ""),
    card: get(item, "card", ""),
    other: get(item, "other", ""),

    products: get(item, "products", []),
    services: get(item, "services", []),
  };
}

export function prepareStorageProductForEdit(item) {
  return {
    name: get(item, "name", ""),
  };
}
