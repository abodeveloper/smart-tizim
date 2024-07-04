import { formatTimeForApi } from "@/utils/helpers";
import dayjs from "dayjs";
import { get } from "lodash";

export function prepareClientDto(item) {
  alert(JSON.stringify(item));
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
