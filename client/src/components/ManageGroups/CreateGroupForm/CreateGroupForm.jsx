import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import styles from "./CreateGroupForm.module.css";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import { devLog, handleApiErrors } from "../../../utils/errorUtils";
import {
  setActiveGroupCode,
  setPreviousRoute,
  storeGroupCode,
} from "../../../utils/localStorage";
import { ROUTES } from "../../../constants/routesConstants";
import { replaceSlashesWithDashes } from "../../../utils/replaceSlashesWithDashes";
import { plusFormSubmitButtonStyles } from "../../../constants/stylesConstants";
import FormSubmitButton from "../../FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../ErrorModal/ErrorModal";
import { useLocation, useNavigate } from "react-router-dom";
import { createGroup } from "../../../api/groups/createGroup.js";

const CreateGroupForm = ({ isExistingUser = false }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { pathname } = useLocation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await createGroup(groupName);
      const { groupCode } = response.group;

      storeGroupCode(groupCode);
      setActiveGroupCode(groupCode);
      setPreviousRoute(pathname);
      navigate(`/${ROUTES.MEMBERS.CREATE}`);
    } catch (error) {
      if (error.response) {
        handleApiErrors(error, setError, "groups", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        devLog("Error creating group.", error);
        displayErrorModal();
      }
    }
  };

  const handleInputChange = (e) => {
    setGroupName(replaceSlashesWithDashes(e.target.value));
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
