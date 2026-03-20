import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CLIENT_STATIC_ROUTES from "../../../constants/clientStaticRoutesConstants.js";
import setPreviousRouteInLocalStorage from "../../../utils/localStorage/setPreviousRouteInLocalStorage.js";
import styles from "./TermsAndConditionsSection.module.css";

const { TERMS_AND_CONDITIONS } = CLIENT_STATIC_ROUTES;

const TermsAndConditionsSection = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const handleLinkClick = () => {
    setPreviousRouteInLocalStorage(pathname);
  };

  return (
    <p className={styles.terms}>
      {t("terms-and-conditions-section-text")}
      <Link
        className={styles.tncLink}
        to={TERMS_AND_CONDITIONS}
        onClick={handleLinkClick}>
        {` ${t("terms-and-conditions-section-tnc")}`}
      </Link>
      {t("terms-and-conditions-section-append")}.
    </p>
  );
};

export default TermsAndConditionsSection;
