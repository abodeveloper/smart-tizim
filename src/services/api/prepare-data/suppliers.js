import { formatTimeForApi } from "@/utils/helpers";
import dayjs from "dayjs";
import { get } from "lodash";

export function prepareSupplierDto(item) {
  return {
    name: get(item, "name", ""),
    phone: get(item, "phone", ""),
    supplier_type: get(item, "supplier_type", ""),
    desc: get(item, "desc", ""),
    added: formatTimeForApi(get(item, "added", "")),
  };
}

export function prepareSupplierForEdit(item) {
  return {
    name: get(item, "name", ""),
    phone: get(item, "phone", ""),
    supplier_type: get(item, "supplier_type", ""),
    desc: get(item, "desc", ""),
    added: dayjs(item.added),
  };
}
