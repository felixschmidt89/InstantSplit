import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./TermsAndConditionsSection.module.css";
import { ROUTES } from "../../../constants/routesConstants";
import { setPreviousRoute } from "../../../utils/localStorage";

const TermsAndConditionsSection = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <p className={styles.terms}>
      {t("terms-and-conditions-section-text")}{" "}
      <Link
        className={styles.tncLink}
        to={ROUTES.TERMS_AND_CONDITIONS}
        onClick={() => setPreviousRoute(pathname)}>
        {t("terms-and-conditions-section-tnc")}
      </Link>
      {t("terms-and-conditions-section-append")}.
    </p>
  );
};

export default TermsAndConditionsSection;
