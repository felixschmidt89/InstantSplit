// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

// Constants and Utils
import { smallButtonStyles } from "../../../constants/stylesConstants";
import { setPwaCtaClosedInLocalStorage } from "../../../utils/localStorageUtils";

// Components
import RenderInstallPwaCta from "../RenderInstallPwaCta/RenderInstallPwaCta";

// Styles
import styles from "./PwaCtaModal.module.css";

/**
 * Component for rendering a CTA modal, explaining how to manually install the PWA.
 * @param {object} props - Component props.
 * @param {string} props.ctaToRender - The type of PWA call-to-action to render depending on client.
 * @param {function} props.setShowPwaCtaModal - Function to control the visibility of the modal.
 * @returns {JSX.Element} The PwaCtaModal component.
 */
const PwaCtaModal = ({ ctaToRender, setShowPwaCtaModal }) => {
  const { t } = useTranslation();

  const closeModal = () => {
    setPwaCtaClosedInLocalStorage();
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
