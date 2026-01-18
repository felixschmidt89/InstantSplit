// React and Third-Party Libraries
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdInstallMobile } from "react-icons/md";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./InstallPwaFirefox.module.css";

/**
 * Renders instructions for installing PWA via Firefox Android app.
 * @returns {JSX.Element} React component.
 */
const InstallPwaFirefox = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p className={styles.text}>{t("install-pwa-cta")}:</p>
      <ul className={styles.installPwaExplanationList}>
        <li>
          {t("install-pwa-firefox-list-item1-part1")}
          <HiDotsVertical className={styles.dotsIcon} />{" "}
          {t("install-pwa-firefox-list-item1-part2")},
        </li>
        <li>{t("install-pwa-firefox-list-item2")},</li>
        <li>
          {t("install-pwa-firefox-list-item3-part1")}
          <MdInstallMobile className={styles.installIcon} />{" "}
          {t("install-pwa-firefox-list-item3-part2")}.
        </li>
      </ul>
    </div>
  );
};

export default InstallPwaFirefox;
