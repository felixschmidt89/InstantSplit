// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

// Constants and Utils
import { smallButtonStyles } from "../../../constants/stylesConstants";

// Components
import RenderInstallPwaCta from "../RenderInstallPwaCta/RenderInstallPwaCta";

// Styles
import styles from "./PwaCtaModal.module.css";
import { setPwaCtaClosed } from "@client-utils/localStorage";

const PwaCtaModal = ({ ctaToRender, setShowPwaCtaModal }) => {
  const { t } = useTranslation();

  const closeModal = () => {
    setPwaCtaClosed();
    setShowPwaCtaModal(false);
  };

  const preventModalFromBeingClosed = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modal}>
      <div
        className={styles.modalContent}
        onClick={preventModalFromBeingClosed}>
        <>
          <RenderInstallPwaCta
            ctaToRender={ctaToRender}
            closeModal={closeModal}
          />
          <Button
            style={smallButtonStyles}
            variant='outlined'
            onClick={closeModal}
            color='grey'>
            {t("close-pwa-cta-modal-button")}
          </Button>
        </>
      </div>
    </div>
  );
};

export default PwaCtaModal;
