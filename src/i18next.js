import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

i18n
  .use(Backend)
  .use(
    resourcesToBackend((lng, ns) => import(`../src/locales/${lng}/${ns}.json`))
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    partialBundledLanguages: true,
    fallbackLng: "uz",
    debug: true,
    supportedLngs: ["uz", "kr", "ru"],
    detection: {
      order: [
        "cookie",
        "querystring",
        "htmlTag",
        "localStorage",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    resources: {},
    ns: ["translation"],
    defaultNS: ["translation"],
    saveMissing: false,
    react: {
      useSuspense: false,
    },
  });
export default i18n;
