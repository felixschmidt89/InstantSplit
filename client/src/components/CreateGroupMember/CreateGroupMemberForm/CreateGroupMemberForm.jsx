import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import apiClient from "../../../api/axiosInstance";
import { useGroupContext } from "../../../context/GroupContext";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import { handleApiErrors } from "../../../utils/errorUtils";
import { sendFormSubmitButtonStyles } from "../../../constants/stylesConstants";
import FormSubmitButton from "../../FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../ErrorModal/ErrorModal";

import styles from "./CreateGroupMemberForm.module.css";
import debugLog from "../../../../../shared/utils/debug/debugLog.js";

const CreateGroupMemberForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const { refreshGroupMembers, activeGroupCode: groupCode } = useGroupContext();

  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  const handleModalClose = () => {
    handleCloseErrorModal();
    setError(null);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const isUserNameEmpty = !userName.trim();
    if (isUserNameEmpty) {
      return;
    }

    setError(null);

    try {
      await apiClient.post(`/users`, {
        userName,
        groupCode,
      });

      setUserName("");

      if (refreshGroupMembers) {
        await refreshGroupMembers();
      }
    } catch (apiError) {
      if (apiError.response) {
        handleApiErrors(apiError, setError, "users", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        debugLog("Error creating user", { error: apiError.message });
        displayErrorModal();
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          placeholder={t("create-group-members-membername-placeholder")}
          className={styles.inputField}
          ref={inputRef}
          autoFocus
        />
        <FormSubmitButton {...sendFormSubmitButtonStyles} />
      </form>

      <ErrorModal
        error={error}
        onClose={handleModalClose}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default CreateGroupMemberForm;
