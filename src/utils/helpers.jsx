import toast from "@/services/notification/notification";
import dayjs from "dayjs";
import { get } from "lodash";
import { NumericFormat } from "react-number-format";

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

export function getValidationStatusForArray(
  errors,
  arrayName,
  index,
  fieldName
) {
  return {
    validateStatus: errors[arrayName]?.[index]?.[fieldName] ? "error" : "",
    help: errors[arrayName]?.[index]?.[fieldName]?.message || "",
  };
}

export function handleErrorNotification(error) {
  toast
    .setDuration(4)
    .setDesc(get(error?.response?.data, "message", get(error, "message", "")))
    .setMessage("Xatolik")
    .error();
}

export function handleSuccessNotification(
  successMessage = "Muvaffaqiyatli bajarildi !"
) {
  toast.setDuration(4).setMessage(successMessage).setDesc("").success();
}

export function NumberToThousandFormat(number, suffixText = "") {
  return (
    <NumericFormat
      value={number}
      displayType={"text"}
      thousandSeparator={" "}
      suffix={` ${suffixText}`}
      renderText={(formattedValue) => <>{formattedValue}</>}
    />
  );
}

export function formatTimeForApi(date) {
  if (!date) {
    return;
  }

  return dayjs(date);
}

export function formatTimeForUI(date) {
  if (!date) {
    return;
  }

  return dayjs(date).format("YYYY-MM-DD HH:mm");
}
