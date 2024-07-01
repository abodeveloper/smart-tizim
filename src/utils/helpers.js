import toast from "@/services/notification/notification";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  toast
    .setDuration(4)
    .setDesc(get(error?.response?.data, "message", get(error, "message")))
    .setMessage(t("Xatolik"))
    .error();
}

export function handleSuccessNotification() {
  const { t } = useTranslation();
  toast.setDuration(4).setMessage(t("Muvaffaqiyatli bajarildi !")).success();
}
