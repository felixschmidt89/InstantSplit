import { useTranslation } from "react-i18next";

import TERMS_AND_CONDITIONS from "../termsAndConditionsConstants.js";
import LANGUAGE from "../../../../../shared/constants/system/languageConstants.js";
import getLocalizedDateString from "../../../../../shared/utils/dates/getLocalizedDateString.js";
import getLanguageFromLocalStorage from "../../../utils/localStorage/getLanguageFromLocalStorage.js";

import styles from "./Disclaimer.module.css";

const { LAST_UPDATE_DATE } = TERMS_AND_CONDITIONS;
const { DEFAULT_LANGUAGE } = LANGUAGE;

const Disclaimer = () => {
  const { t } = useTranslation();

  const userLanguage = getLanguageFromLocalStorage() ?? DEFAULT_LANGUAGE;
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
