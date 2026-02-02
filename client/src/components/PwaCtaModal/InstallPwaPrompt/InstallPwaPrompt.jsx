// React and Third-Party Libraries
import React from "react";
import { Button } from "@mui/material";
import { usePWAInstall } from "react-use-pwa-install";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { buttonStyles } from "../../../constants/stylesConstants";

// Styles
import styles from "./InstallPwaPrompt.module.css";

/**
 * Renders instructions for installing PWA via Chrome Android app.
 * @returns {JSX.Element} React component.
 */

const InstallPwaPrompt = () => {
  const { t } = useTranslation();
  // use library to install PWA
  const handleInstallPWA = usePWAInstall();
  return (
    <div className={styles.container}>
      <p className={styles.text}>{t("install-pwa-install-cta")}:</p>
      <Button
        style={buttonStyles}
        variant='contained'
        onClick={handleInstallPWA}>
        {t("install-pwa-install-button")}
      </Button>
    </div>
  );
};

export default InstallPwaPrompt;
