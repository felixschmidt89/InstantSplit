import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { devLog, handleApiErrors } from "@client-utils/errorUtils";
import { plusFormSubmitButtonStyles } from "@client-constants/stylesConstants";
import { replaceSlashesWithDashes } from "@client-utils/replaceSlashesWithDashes";
import { ROUTES } from "@client-constants/routesConstants";

import useErrorModalVisibility from "@hooks/useErrorModalVisibility";

import FormSubmitButton from "@components/FormSubmitButton/FormSubmitButton";
import ErrorModal from "@components/ErrorModal/ErrorModal";

import styles from "./CreateGroupForm.module.css";
import {
  setActiveGroupCode,
  setPreviousRoute,
  storeGroupCode,
} from "@client-utils/localStorage";

import { API_URL } from "@client-constants/apiConstants";

const CreateGroupForm = ({ isExistingUser = false }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const pathname = useLocation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/groups`, {
        groupName,
      });

      devLog("Group created:", response);
      const { groupCode } = response.data.group;

      storeGroupCode(groupCode);
      setActiveGroupCode(groupCode);
      setPreviousRoute(pathname);
      navigate(ROUTES.MEMBERS.CREATE);
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
