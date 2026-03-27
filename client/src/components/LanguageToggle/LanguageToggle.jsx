import { useTranslation } from "react-i18next";

import LANGUAGE from "../../../../shared/constants/system/languageConstants.js";
import setLanguageInLocalStorage from "../../utils/localStorage/setLanguageInLocalStorage.js";

import deFlag from "../../assets/flags/de.svg";
import enFlag from "../../assets/flags/gb.svg";
import styles from "./LanguageToggle.module.css";

const { LANGUAGES } = LANGUAGE;

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const isGerman = i18n.language === LANGUAGES.GERMAN;
  const nextLanguage = isGerman ? LANGUAGES.ENGLISH : LANGUAGES.GERMAN;
  const targetFlag = isGerman ? enFlag : deFlag;

  // TODO: add translations keys
  const targetAltText = isGerman
    ? "Switch to English"
    : "Auf Deutsch umstellen";

  const handleLanguageToggle = () => {
    i18n.changeLanguage(nextLanguage);
    setLanguageInLocalStorage(nextLanguage);
  };

  return (
    <div className={styles.container}>
      <button
        type='button'
        className={styles["language-flag"]}
        onClick={handleLanguageToggle}
        aria-label={targetAltText}>
        <img src={targetFlag} alt='' aria-hidden='true' />
      </button>
    </div>
  );
};

export default LanguageToggle;
