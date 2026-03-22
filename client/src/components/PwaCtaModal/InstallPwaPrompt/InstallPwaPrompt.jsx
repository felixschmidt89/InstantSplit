import { Button } from "@mui/material";
import { usePWAInstall } from "react-use-pwa-install";
import { useTranslation } from "react-i18next";

import buttonStyles from "../../../constants/stylesConstants";

import styles from "./InstallPwaPrompt.module.css";

const InstallPwaPrompt = () => {
  const { t } = useTranslation();
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
