import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setRouteInLocalStorage } from "../../../utils/localStorageUtils";
import { ROUTES } from "../../../constants/routesConstants";
import styles from "./TermsAndConditionsSection.module.css";

const TermsAndConditionsSection = () => {
  const { t } = useTranslation();

  const handleLinkClick = () => {
    setRouteInLocalStorage(window.location.pathname, "previousRoute");
  };

  return (
    <p className={styles.terms}>
      {t("terms-and-conditions-section-text")}{" "}
      <Link
        className={styles.tncLink}
        to={ROUTES.TERMS_AND_CONDITIONS}
        onClick={handleLinkClick}>
        {t("terms-and-conditions-section-tnc")}
      </Link>
      {t("terms-and-conditions-section-append")}.
    </p>
  );
};

export default TermsAndConditionsSection;
