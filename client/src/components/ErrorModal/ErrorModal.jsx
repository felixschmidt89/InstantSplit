import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from "./ErrorModal.module.css";
import STYLES from "../../constants/stylesConstants";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

const { smallButtonStyles } = STYLES;

const ErrorModal = ({ error, onClose, isOpen }) => {
  const { t } = useTranslation();

  const handleModalClick = (e) => e.stopPropagation();
  const handleOutsideClick = () => onClose();

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <div className={styles.modalContent} onClick={handleModalClick}>
        <span className={styles.errorMessage}>
          <ErrorDisplay error={error} remWidth={30} errorFontColor={false} />
        </span>

        <Button
          style={smallButtonStyles}
          variant='outlined'
          onClick={onClose}
          color='grey'>
          {t("error-modal-close-modal-button-text")}
        </Button>
      </div>
    </div>
  );
};

export default ErrorModal;
