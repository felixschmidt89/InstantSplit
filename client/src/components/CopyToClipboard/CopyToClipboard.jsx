import { useState, useRef } from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { useTranslation } from "react-i18next";

import useErrorModalVisibility from "../../hooks/useErrorModalVisibility.jsx";
import ErrorModal from "../ErrorModal/ErrorModal.jsx";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

import styles from "./CopyToClipboard.module.css";

const { INFO, ERROR } = LOG_LEVELS;

const CopyToClipboard = ({ infoToCopy, inputFieldWidth = 16.5 }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleCopyClick = async () => {
    try {
      if (inputRef.current) {
        await navigator.clipboard.writeText(inputRef.current.value);

        debugLog("Copied to clipboard:", inputRef.current.value, INFO);

        setIsCopied(true);

        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
        }
      }
    } catch (copyError) {
      debugLog("Error copying to clipboard:", copyError, ERROR);
      setError(t("copy-to-clipboard-component-error-copy"));
      displayErrorModal();
      setIsCopied(false);
    }
  };

  return (
    <span className={styles.container}>
      <input
        className={styles.inputField}
        type='text'
        value={infoToCopy}
        readOnly
        style={{ width: `${inputFieldWidth}rem` }}
        ref={inputRef}
      />
      <span
        className={`${styles.button} ${
          isCopied ? styles.isCopied : styles.notCopied
        }`}
        onClick={handleCopyClick}>
        {isCopied ? <LuCopyCheck /> : <LuCopy />}
      </span>
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </span>
  );
};

export default CopyToClipboard;
