import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGroupContext } from "../../../context/GroupContext.jsx";
import { useGlobalError } from "../../../context/ErrorContext.jsx";
import NAV_LINKS from "../../../constants/clientRouteLinks.js";
import STYLES from "../../../constants/stylesConstants.jsx";
import createGroup from "../../../api/groups/createGroup.js";
import setActiveGroupCodeInLocalStorage from "../../../utils/localStorage/setActiveGroupCodeInLocalStorage.js";
import setPreviousRouteInLocalStorage from "../../../utils/localStorage/setPreviousRouteInLocalStorage.js";
import storeGroupCodeInLocalStorage from "../../../utils/localStorage/storeGroupCodeInLocalStorage.js";
import { handleApiErrors } from "../../../utils/errorUtils.jsx";
import LOG_LEVELS from "../../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../../shared/utils/debug/debugLog.js";
import FormSubmitButton from "../../FormSubmitButton/FormSubmitButton.jsx";
import styles from "./CreateGroupForm.module.css";
import replaceSlashesWithDashes from "../../../../../shared/utils/strings/replaceSlashesWithDashes.js";

const { LOG_ERROR } = LOG_LEVELS;
const { MEMBERS } = NAV_LINKS;
const { plusFormSubmitButtonStyles } = STYLES;

const CreateGroupForm = ({ shouldSkipInitialFocus = false }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const groupNameInputRef = useRef(null);

  const { showError } = useGlobalError();
  const { setActiveGroupCode } = useGroupContext();

  const [draftGroupName, setDraftGroupName] = useState("");
  const [submissionError, setSubmissionError] = useState(null);

  const isGroupNameProvided = Boolean(draftGroupName.length);

  const onGroupNameChange = (event) => {
    setDraftGroupName(replaceSlashesWithDashes(event.target.value));
  };

  const onGroupCreationSubmit = async (event) => {
    event.preventDefault();
    setSubmissionError(null);

    try {
      const response = await createGroup(draftGroupName);
      const { groupCode } = response.group;

      storeGroupCodeInLocalStorage(groupCode);
      setActiveGroupCodeInLocalStorage(groupCode);
      setPreviousRouteInLocalStorage(pathname);
      setActiveGroupCode(groupCode);

      debugLog("Group created successfully, navigating to member creation", {
        groupCode,
      });

      navigate(MEMBERS.CREATE(groupCode));
    } catch (apiError) {
      if (apiError.response) {
        handleApiErrors(apiError, setSubmissionError, "groups", showError, t);
      } else {
        const genericMessage = t("generic-error-message");
        setSubmissionError(genericMessage);
        debugLog(
          "Error creating group",
          { error: apiError.message },
          LOG_ERROR,
        );
        showError(genericMessage);
      }
    }
  };

  useEffect(() => {
    if (!shouldSkipInitialFocus) {
      groupNameInputRef.current?.focus();
    }
  }, [shouldSkipInitialFocus]);

  return (
    <form onSubmit={onGroupCreationSubmit} className={styles.container}>
      <h2>{t("create-group-header")}</h2>

      <input
        className={styles.inputField}
        type='text'
        value={draftGroupName}
        onChange={onGroupNameChange}
        placeholder={t("create-group-group-name-placeholder")}
        ref={groupNameInputRef}
      />

      <FormSubmitButton
        {...plusFormSubmitButtonStyles}
        disabled={!isGroupNameProvided}
      />
    </form>
  );
};

export default CreateGroupForm;
