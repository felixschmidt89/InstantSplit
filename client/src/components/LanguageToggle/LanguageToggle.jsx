import { useState } from "react";
import { useTranslation } from "react-i18next";

import deFlag from "../../assets/flags/de.svg";
import enFlag from "../../assets/flags/gb.svg";

import styles from "./LanguageToggle.module.css";
import setLanguageInLocalStorage from "../../utils/localStorage/setLanguageInLocalStorage.js";
import { LANGUAGES } from "../../../../shared/constants/system/languageConstants.js";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const isGerman = currentLanguage === LANGUAGES.GERMAN;
  const nextLanguage = isGerman ? LANGUAGES.ENGLISH : LANGUAGES.GERMAN;

  const targetFlag = isGerman ? enFlag : deFlag;
  // TODO: add translations keys
  const targetAltText = isGerman
    ? "Switch to English"
    : "Auf Deutsch umstellen";

  const handleToggle = () => {
    setCurrentLanguage(nextLanguage);

    i18n.changeLanguage(nextLanguage);

    setLanguageInLocalStorage(nextLanguage);
  };

  return (
    <div className={styles.container}>
      <button
        type='button'
        className={styles["language-flag"]}
        onClick={handleToggle}
        aria-label={targetAltText}>
        <img src={targetFlag} alt='' aria-hidden='true' />
      </button>
    </div>
  );
};

export default LanguageToggle;
