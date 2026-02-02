// React and Third-Party Libraries
import React, { useState, useRef } from "react";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../../utils/errorUtils";

// Hooks
import useErrorModalVisibility from "../../hooks/useErrorModalVisibility";

// Components
import ErrorModal from "../ErrorModal/ErrorModal";

// Styles
import styles from "./CopyToClipboard.module.css";

type CopyToClipboardProps = {
  // copy to be copied to clipboard
  infoToCopy: string;
  inputFieldWidth?: number;
};

/**
 * Component for rendering a copy and copying it to the clipboard with visual feedback
 */
const CopyToClipboard = ({
  infoToCopy,
  inputFieldWidth = 16.5,
}: CopyToClipboardProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleCopyClick = async () => {
    try {
      if (inputRef.current) {
        // Copy text to clipboard
        await navigator.clipboard.writeText(inputRef.current.value);
        devLog("Copied to clipboard:", inputRef.current.value);
        setIsCopied(true);
        // remove text if selected
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
        }
      }
    } catch (error) {
      devLog("Error copying to clipboard:", error);
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
