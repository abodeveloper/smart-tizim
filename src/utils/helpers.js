export function objectToQueryString(obj) {
  return Object.keys(obj)
    .filter((key) => obj[key] !== null) // Null qiymatlarni filtrlaymiz
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
}
