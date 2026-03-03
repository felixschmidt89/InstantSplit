import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./Footer.module.css";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { CLIENT_STATIC_ROUTES } from "../../constants/clientStaticRoutesConstants.js";

const { LEGAL_NOTICE, TERMS_AND_CONDITIONS } = CLIENT_STATIC_ROUTES;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <span className={styles.localeSwitcher}>
        <LanguageToggle />
      </span>
      <Link to={LEGAL_NOTICE} className={styles.link}>
        {t("footer-legal-notice-link")}
      </Link>

      <Link to={TERMS_AND_CONDITIONS} className={styles.link}>
        {t("footer-t&c-link")}
      </Link>
    </footer>
  );
};

export default Footer;
