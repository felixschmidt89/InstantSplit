import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";
import { useGroupContext } from "../../../../context/GroupContext";
import NAV_LINKS from "../../../../constants/clientRouteLinks.js";
import STYLES from "../../../../constants/stylesConstants.js";
import createGroup from "../../../../api/groups/createGroup.js";
import setActiveGroupCodeInLocalStorage from "../../../../utils/localStorage/setActiveGroupCodeInLocalStorage.js";
import setPreviousRouteInLocalStorage from "../../../../utils/localStorage/setPreviousRouteInLocalStorage.js";
import storeGroupCodeInLocalStorage from "../../../../utils/localStorage/storeGroupCodeInLocalStorage.js";
import handleApiErrors from "../../../../utils/errorUtils.js";
import replaceSlashesWithDashes from "../../../../utils/replaceSlashesWithDashes.js";
import LOG_LEVELS from "../../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../../shared/utils/debug/debugLog.js";
import FormSubmitButton from "../../FormSubmitButton/FormSubmitButton.jsx";
import ErrorModal from "../../ErrorModal/ErrorModal.jsx";
import styles from "./CreateGroupForm.module.css";

const { LOG_ERROR } = LOG_LEVELS;
const { MEMBERS } = NAV_LINKS;
const { plusFormSubmitButtonStyles } = STYLES;

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

  const hasGroupName = Boolean(groupName.length);

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

      navigate(MEMBERS.CREATE(groupCode));
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
      <FormSubmitButton
        {...plusFormSubmitButtonStyles}
        disabled={!hasGroupName}
      />

      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </form>
  );
};

export default CreateGroupForm;
