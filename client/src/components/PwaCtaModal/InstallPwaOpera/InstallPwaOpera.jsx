// React and Third-Party Libraries
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { MdAddToHomeScreen } from "react-icons/md";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./InstallPwaOpera.module.css";

/**
 * Renders instructions for installing PWA via Opera Android app.
 * @returns {JSX.Element} React component.
 */
const InstallPwaOpera = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p className={styles.text}>{t("install-pwa-cta")}:</p>
      <ul className={styles.installPwaExplanationList}>
        <li>
          {t("install-pwa-opera-list-item1-part1")}{" "}
          <HiDotsVertical className={styles.dotsIcon} />{" "}
          {t("install-pwa-opera-list-item1-part2")},
        </li>
        <li>
          {t("install-pwa-opera-list-item2-part1")}{" "}
          <HiOutlinePlusCircle className={styles.addToIcon} />
          {t("install-pwa-opera-list-item2-part2")},
        </li>
        <li>
          {t("install-pwa-opera-list-item3-part1")}{" "}
          <MdAddToHomeScreen className={styles.homeScreenIcon} />{" "}
          {t("install-pwa-opera-list-item3-part2")}.
        </li>
      </ul>
    </div>
  );
};

export default InstallPwaOpera;
