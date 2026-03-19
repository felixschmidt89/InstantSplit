import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import { useGroupContext } from "../../../context/GroupContext";

import setActiveGroupCodeInLocalStorage from "../../../utils/localStorage/setActiveGroupCodeInLocalStorage.js";
import setPreviousRouteInLocalStorage from "../../../utils/localStorage/setPreviousRouteInLocalStorage.js";
import storeGroupCodeInLocalStorage from "../../../utils/localStorage/storeGroupCodeInLocalStorage.js";
import { handleApiErrors } from "../../../utils/errorUtils";
import { replaceSlashesWithDashes } from "../../../utils/replaceSlashesWithDashes";

import { TO_MEMBERS } from "../../../constants/clientRouteLinks.js";
import { plusFormSubmitButtonStyles } from "../../../constants/stylesConstants";
import { createGroup } from "../../../api/groups/createGroup";

import FormSubmitButton from "../../FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../ErrorModal/ErrorModal";
import styles from "./CreateGroupForm.module.css";
import LOG_LEVELS from "../../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;

const CreateGroupForm = ({ isExistingUser = false }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const { setActiveGroupCode } = useGroupContext();

  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setGroupName(replaceSlashesWithDashes(event.target.value));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await createGroup(groupName);
      const { groupCode } = response.group;

      storeGroupCodeInLocalStorage(groupCode);
      setActiveGroupCodeInLocalStorage(groupCode);
      setPreviousRouteInLocalStorage(pathname);

      setActiveGroupCode(groupCode);

      debugLog("Group created successfully, navigating to member creation", {
        groupCode,
      });
      navigate(TO_MEMBERS.CREATE);
    } catch (apiError) {
      if (apiError.response) {
        handleApiErrors(apiError, setError, "groups", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        debugLog(
          "Error creating group",
          { error: apiError.message },
          LOG_ERROR,
        );
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
