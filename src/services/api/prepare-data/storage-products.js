import { get } from "lodash";

export function prepareStorageProductDto(item) {
  return {
    name: get(item, "name", ""),
  };
}

export function prepareStorageProductForEdit(item) {
  return {
    name: get(item, "name", ""),
  };
}
