// React and Third-Party Libraries
import React from "react";
import { TbShare2 } from "react-icons/tb";
import { MdOutlineAddBox } from "react-icons/md";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./InstallPwaSafari.module.css";

/**
 * Renders instructions for installing PWA via Safari iOs app.
 * @returns {JSX.Element} React component.
 */
const InstallPwaSafari = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p className={styles.text}>{t("install-pwa-cta")}:</p>
      <ul className={styles.installPwaExplanationList}>
        <li>
          {t("install-pwa-safari-list-item1-part1")}{" "}
          <TbShare2 className={styles.dotsIcon} />{" "}
          {t("install-pwa-safari-list-item1-part2")},
        </li>
        <li>{t("install-pwa-safari-list-item2")},</li>
        <li>
          {t("install-pwa-safari-list-item3-part1")}{" "}
          <MdOutlineAddBox className={styles.installIcon} />
          {t("install-pwa-safari-list-item3-part2")}
        </li>
      </ul>
    </div>
  );
};

export default InstallPwaSafari;
