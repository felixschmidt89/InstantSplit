import { useTranslation } from "react-i18next";

import { getLanguageFromLocalStorage } from "@utils/localStorageUtils";

import styles from "./Disclaimer.module.css";

const Disclaimer = ({ lastUpdateDate }) => {
  const { t } = useTranslation();

  const userLanguage = getLanguageFromLocalStorage() || "de";

  const dateFormat = userLanguage === "de" ? "de-DE" : "en-UK";
  const lastUpdate = new Date(lastUpdateDate).toLocaleDateString(dateFormat);

  return (
    <div className={styles.container}>
      <h2>{t("disclaimer-header")}</h2>
      <p className={styles.disclaimer}>
        {t("disclaimer-copy")} <strong>{lastUpdate}</strong>.
      </p>
    </div>
  );
};

export default Disclaimer;
