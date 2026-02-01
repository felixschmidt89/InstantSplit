import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./Footer.module.css";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { ROUTES } from "../../constants/routesConstants";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <span className={styles.localeSwitcher}>
        <LanguageToggle />
      </span>

      <a
        href='https://github.com/felixschmidt89/InstantSplit'
        target='_blank'
        rel='noopener noreferrer'
        className={styles.link}>
        {t("footer-github-link")}
      </a>

      <Link to={ROUTES.LEGAL_NOTICE} className={styles.link}>
        {t("footer-legal-notice-link")}
      </Link>

      <Link to={ROUTES.TERMS_AND_CONDITIONS} className={styles.link}>
        {t("footer-t&c-link")}
      </Link>
    </footer>
  );
};

export default Footer;
