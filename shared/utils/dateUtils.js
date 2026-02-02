import {
  LANGUAGE_LOCALES,
  DEFAULT_LANGUAGE,
} from "../constants/languageConstants";

export const getLocalizedDateString = (date, language = DEFAULT_LANGUAGE) => {
  const locale =
    LANGUAGE_LOCALES[language] || LANGUAGE_LOCALES[DEFAULT_LANGUAGE];
  return new Date(date).toLocaleDateString(locale);
};
