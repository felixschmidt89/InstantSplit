import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useAppNavigate from "../../../hooks/useAppNavigate";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";

import {
  setActiveGroupCode,
  setPreviousRoute,
  storeGroupCode,
} from "../../../utils/localStorage";
import { handleApiErrors } from "../../../utils/errorUtils";
import { replaceSlashesWithDashes } from "../../../utils/replaceSlashesWithDashes";

import { ROUTES } from "../../../constants/routesConstants";
import { plusFormSubmitButtonStyles } from "../../../constants/stylesConstants";
import { createGroup } from "../../../api/groups/createGroup";

import FormSubmitButton from "../../FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../ErrorModal/ErrorModal";
import styles from "./CreateGroupForm.module.css";
import { LOG_LEVELS } from "../../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;

const CreateGroupForm = ({ isExistingUser = false }) => {
  const navigate = useAppNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setGroupName(replaceSlashesWithDashes(e.target.value));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await createGroup(groupName);
      const { groupCode } = response.group;

      storeGroupCode(groupCode);
      setActiveGroupCode(groupCode);
      setPreviousRoute(pathname);

      navigate(ROUTES.MEMBERS.CREATE);
    } catch (error) {
      if (error.response) {
        handleApiErrors(error, setError, "groups", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        debugLog("Error creating group", { error: error.message }, LOG_ERROR);
        displayErrorModal();
      }
    }
  };

  useEffect(() => {
    if (!isExistingUser) {
      inputRef.current?.focus();
    }
  }, [isExistingUser]);

  return (
    <form onSubmit={handleFormSubmit} className={styles.container}>
      <h2>{t("create-group-header")}</h2>

      <input
        className={styles.inputField}
        type='text'
        value={groupName}
        onChange={handleInputChange}
        placeholder={t("create-group-group-name-placeholder")}
        ref={inputRef}
      />

      {/* TODO: Re-enable FriendlyCaptcha validation & ensure it's working on test deploy too */}
      <FormSubmitButton {...plusFormSubmitButtonStyles} />

      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </form>
  );
};

export default CreateGroupForm;
