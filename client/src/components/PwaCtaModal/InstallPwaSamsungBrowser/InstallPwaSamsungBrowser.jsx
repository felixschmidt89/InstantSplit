// React and Third-Party Libraries
import React from "react";
import { LuMenu } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./InstallPwaSamsungBrowser.module.css";

/**
 * Renders instructions for installing PWA via Samsung Browser Android app.
 * @returns {JSX.Element} React component.
 */
const InstallPwaSamsungBrowser = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p className={styles.text}>{t("install-pwa-cta")}:</p>
      <ul className={styles.installPwaExplanationList}>
        <li>
          {t("install-pwa-samsung-browser-list-item1-part1")}{" "}
          <LuMenu className={styles.dotsIcon} />{" "}
          {t("install-pwa-samsung-browser-list-item1-part2")},
        </li>
        <li>
          {t("install-pwa-samsung-browser-list-item2-part1")}{" "}
          <LuPlus className={styles.installIcon} />
          {t("install-pwa-samsung-browser-list-item2-part2")},
        </li>
        <li>{t("install-pwa-samsung-browser-list-item3")}.</li>
      </ul>
    </div>
  );
};

export default InstallPwaSamsungBrowser;
