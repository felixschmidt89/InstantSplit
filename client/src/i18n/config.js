import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { getLanguage } from "@client-utils/localStorageUtils";
import {
  LANGUAGES,
  DEFAULT_LANGUAGE,
} from "@shared-constants/languageConstants";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: getLanguage() || DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: Object.values(LANGUAGES),
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/translations.json",
    },
  });

export default i18n;
