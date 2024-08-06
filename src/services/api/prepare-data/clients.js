import { formatTimeForApi } from "@/utils/helpers";
import dayjs from "dayjs";
import { get } from "lodash";

export function prepareClientDto(item) {
  return {
    name: get(item, "name", ""),
    phone: get(item, "phone", ""),
    client_type: get(item, "client_type", ""),
    desc: get(item, "desc", ""),
    added: formatTimeForApi(get(item, "added", "")),
  };
}

export function prepareClientForEdit(item) {
  return {
    name: get(item, "name", ""),
    phone: get(item, "phone", ""),
    client_type: get(item, "client_type", ""),
    desc: get(item, "desc", ""),
    added: dayjs(item.added),
  };
}


export function prepareAddPaymentClientDto(item) {
  return {
    client: Number(get(item, "client", "")),
    date: formatTimeForApi(get(item, "date", "")),
    cash: get(item, "cash", ""),
    card: get(item, "card", ""),
    other: get(item, "other", ""),
  };
}