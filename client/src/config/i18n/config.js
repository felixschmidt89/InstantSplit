import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import LANGUAGE from "../../../../shared/constants/system/languageConstants.js";
import getLanguageFromLocalStorage from "../../utils/localStorage/getLanguageFromLocalStorage.js";

const { DEFAULT_LANGUAGE, LANGUAGES } = LANGUAGE;

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: getLanguageFromLocalStorage() ?? DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: Object.values(LANGUAGES),
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/translations.json",
    },
  });

export default i18n;
