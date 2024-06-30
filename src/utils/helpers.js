import toast from "@/services/notification/notification";
import { get } from "lodash";

export function objectToQueryString(obj) {
  return Object.keys(obj)
    .filter((key) => obj[key] !== null) // Null qiymatlarni filtrlaymiz
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

export function getValidationStatus(errors, fieldName) {
  return {
    validateStatus: errors[fieldName] ? "error" : "",
    help: errors[fieldName]?.message,
  };
}

export function handleErrorNotification(error) {
  toast
    .setDuration(4)
    .setMessage(get(error?.response?.data?.error, "message", "Error"))
    .setDesc(get(error, "message"))
    .error();
}

export function handleSuccessNotification() {
  toast.setDuration(4).setMessage("Muvaffaqiyatli bajarildi !").success();
}
