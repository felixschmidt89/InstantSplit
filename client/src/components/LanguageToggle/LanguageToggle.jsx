import { useState } from "react";
import { useTranslation } from "react-i18next";

import { setLanguage } from "@client-utils/localStorageUtils";
import { LANGUAGES } from "@shared-constants/languageConstants";

import deFlag from "@assets/flags/de.svg";
import enFlag from "@assets/flags/gb.svg";

import styles from "./LanguageToggle.module.css";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const isGerman = currentLanguage === LANGUAGES.GERMAN;
  const nextLanguage = isGerman ? LANGUAGES.ENGLISH : LANGUAGES.GERMAN;

  const flag = isGerman ? enFlag : deFlag;
  const altText = isGerman ? "Switch to English" : "Auf Deutsch umstellen";

  const handleToggle = () => {
    setCurrentLanguage(nextLanguage);
    i18n.changeLanguage(nextLanguage);
    setLanguage(nextLanguage);
  };

  return (
    <div className={styles.container}>
      <button
        type='button'
        className={styles.languageFlag}
        onClick={handleToggle}
        aria-label={altText}>
        <img src={flag} alt='' aria-hidden='true' />
      </button>
    </div>
  );
};

export default LanguageToggle;
