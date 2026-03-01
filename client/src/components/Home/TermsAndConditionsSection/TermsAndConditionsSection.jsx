import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./TermsAndConditionsSection.module.css";
import { CLIENT_ROUTES } from "../../../constants/clientRoutesConstants";
import { setPreviousRoute } from "../../../utils/localStorage";

const { TERMS_AND_CONDITIONS } = CLIENT_ROUTES;

const TermsAndConditionsSection = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  // TODO: Implement PiratePx alternative and drop PiratePx from terms and conditions

  return (
    <p className={styles.terms}>
      {t("terms-and-conditions-section-text")}{" "}
      <Link
        className={styles.tncLink}
        to={TERMS_AND_CONDITIONS}
        onClick={() => setPreviousRoute(pathname)}>
        {t("terms-and-conditions-section-tnc")}
      </Link>
      {t("terms-and-conditions-section-append")}.
    </p>
  );
};

export default TermsAndConditionsSection;
