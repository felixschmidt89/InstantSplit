import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  getLanguageFromLocalStorage,
  setLanguageInLocalStorage,
} from "@utils/localStorageUtils";

import deFlag from "@assets/flags/de.svg";
import enFlag from "@assets/flags/gb.svg";

import styles from "./LanguageToggle.module.css";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(
    getLanguageFromLocalStorage() || "de",
  );

  const isGerman = currentLanguage === "de";
  const flag = isGerman ? enFlag : deFlag;
  const altText = isGerman ? "English flag" : "German flag";

  const onLanguageToggle = () => {
    const newLanguage = isGerman ? "en" : "de";

    setCurrentLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    setLanguageInLocalStorage(newLanguage);
  };

  useEffect(() => {
    const savedLanguage = getLanguageFromLocalStorage();

    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div className={styles.container}>
      <div
        className={styles.languageFlag}
        onClick={onLanguageToggle}
        role='button'
        tabIndex={0}>
        <img src={flag} alt={altText} />
      </div>
    </div>
  );
};

export default LanguageToggle;
