import LANGUAGE from "../../constants/system/languageConstants.js";

const { LANGUAGE_LOCALES, DEFAULT_LANGUAGE } = LANGUAGE;

const getLocalizedDateString = (date, language = DEFAULT_LANGUAGE) => {
  const locale =
    LANGUAGE_LOCALES[language] || LANGUAGE_LOCALES[DEFAULT_LANGUAGE];
  return new Date(date).toLocaleDateString(locale);
};

export default getLocalizedDateString;
