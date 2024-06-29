export function objectToQueryString(obj) {
  return Object.keys(obj)
    .filter((key) => obj[key] !== null) // Null qiymatlarni filtrlaymiz
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}
