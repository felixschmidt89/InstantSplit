// React and Third-Party Libraries
import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { smallButtonStyles } from "../../../constants/stylesConstants";

// Components
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import ReactIconNavigate from "../../InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./ConfirmationModal.module.css";

/**
 * Component for displaying a confirmation message with options to confirm or cancel.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.message - The message to display in the modal.
 * @param {Function} props.onConfirm - Callback function to execute on confirmation.
 * @param {Function} props.onCancel - Callback function to execute on cancellation.
 * @param {boolean} props.isVisible - Flag indicating whether the modal is visible.
 * @param {Object} props.error - Error object to display in the modal, if any.
 * @returns {JSX.Element} React component.
 */
const ConfirmationModal = ({
  message,
  onConfirm,
  onCancel,
  isVisible,
  error,
}) => {
  const { t } = useTranslation();

  // Prevent modal from being closed when clicking the modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // Close modal when clicking outside of the modal
  const handleOutsideClick = () => {
    onCancel();
  };

  return (
    isVisible && (
      <div className={styles.modal} onClick={handleOutsideClick}>
        <div className={styles.modalContent} onClick={handleModalClick}>
          {error ? (
            <>
              <ErrorDisplay error={error} remWidth={30} />
              <Button
                style={smallButtonStyles}
                variant='outlined'
                onClick={onCancel}
                color='grey'>
                {t("confirmation-modal-error-close-modal-button-text")}
              </Button>
            </>
          ) : (
            <>
              <p className={styles.confirmationMessage}>{message}</p>
              <div className={styles.button}>
                <ReactIconNavigate
                  icon={IoCheckmarkCircleOutline}
                  onClick={onConfirm}
                  iconSize='3'
                  containerHeight='3'
                  containerWidth='3'
                />
                <ReactIconNavigate
                  icon={IoCloseCircleOutline}
                  onClick={onCancel}
                  iconSize='3'
                  containerHeight='3'
                  containerWidth='3'
                />
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};
export default ConfirmationModal;
