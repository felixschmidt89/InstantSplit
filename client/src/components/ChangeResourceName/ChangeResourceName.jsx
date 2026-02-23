import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { handleApiErrors } from "../../utils/errorUtils";
import { submitOnEnter } from "../../utils/form/submitOnEnter";
import { sendFormSubmitButtonStyles } from "../../constants/stylesConstants";
import useErrorModalVisibility from "../../hooks/useErrorModalVisibility";
import FormSubmitButton from "../FormSubmitButton/FormSubmitButton";
import ErrorModal from "../ErrorModal/ErrorModal";
import { ROUTES } from "../../constants/routesConstants";
import styles from "./ChangeResourceName.module.css";
import { API_URL } from "../../constants/apiConstants";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";

const ChangeResourceName = ({
  resourceId,
  resourceType,
  resourceName,
  groupCode,
  headerText,
  inputWidth = 20,
  navigateToMain = true,
  callback,
}) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const storedResourceName = resourceName;
  const [newResourceName, setNewResourceName] = useState(storedResourceName);
  const [error, setError] = useState(null);

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const pluralResourceType = `${resourceType}s`;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = {
        [resourceType]: resourceId,
        [`${resourceType}Name`]: newResourceName,
        groupCode: groupCode,
      };

      const response = await axios.patch(
        `${API_URL}/${pluralResourceType}/${resourceId}`,
        payload,
      );

      debugLog(`${resourceType} name updated:`, response, LOG_LEVELS.INFO);

      if (navigateToMain) {
        navigate(`/${ROUTES.INSTANT_SPLIT}`);
      }
      callback?.(newResourceName);

      inputRef.current.classList.remove(styles.active);
      inputRef.current.blur();
    } catch (error) {
      if (error.response) {
        handleApiErrors(
          error,
          setError,
          pluralResourceType,
          displayErrorModal,
          t,
        );
      } else {
        setError(t("generic-error-message"));
        debugLog(
          `Error updating ${resourceType} name:`,
          error,
          LOG_LEVELS.ERROR,
        );
        displayErrorModal();
      }
    }
  };

  const handleInputClick = () => {
    inputRef.current.classList.add(styles.active);
  };

  return (
    <div className={styles.container}>
      {headerText && <h2 className={styles.header}>{headerText}</h2>}
      <form onSubmit={handleFormSubmit}>
        <input
          className={`${styles.inputField} ${styles.idleOnMount}`}
          type='text'
          value={newResourceName}
          onClick={handleInputClick}
          onChange={(e) => setNewResourceName(e.target.value)}
          placeholder={storedResourceName}
          style={{ width: `${inputWidth}rem` }}
          ref={inputRef}
          onKeyDown={submitOnEnter(handleFormSubmit)}
        />
        <FormSubmitButton {...sendFormSubmitButtonStyles} />
      </form>
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default ChangeResourceName;
