import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import deFlag from "@assets/flags/de.svg";
import enFlag from "@assets/flags/gb.svg";

import styles from "./LanguageToggle.module.css";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "de",
  );

  const flag = currentLanguage === "de" ? enFlag : deFlag;
  const altText = currentLanguage === "de" ? "English flag" : "German flag";

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "de" ? "en" : "de";
    setCurrentLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div className={styles.container}>
      <div className={styles.languageFlag} onClick={toggleLanguage}>
        <img src={flag} alt={altText} />
      </div>
    </div>
  );
};

export default LanguageToggle;
