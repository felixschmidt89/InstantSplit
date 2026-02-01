import { useTranslation } from "react-i18next";

import { LAST_UPDATE_DATE } from "../termsAndConditionsConstants";

import styles from "./Disclaimer.module.css";
import { DEFAULT_LANGUAGE } from "../../../../../shared/constants/languageConstants";
import { getLanguage } from "../../../utils/localStorage";
import { getLocalizedDateString } from "../../../../../shared/utils/dateUtils";

const Disclaimer = () => {
  const { t } = useTranslation();

  const userLanguage = getLanguage() || DEFAULT_LANGUAGE;
  const localizedDate = getLocalizedDateString(LAST_UPDATE_DATE, userLanguage);

  return (
    <div className={styles.container}>
      <h2>{t("disclaimer-header")}</h2>
      <p className={styles.disclaimer}>
        {t("disclaimer-copy")} <strong>{localizedDate}</strong>.
      </p>
    </div>
  );
};

export default Disclaimer;
