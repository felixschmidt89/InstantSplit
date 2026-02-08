import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import apiClient from "../../../api/axiosInstance"; // Use your apiClient
import { useGroupMembersContext } from "../../../context/GroupMembersContext";

import styles from "./CreateGroupMemberForm.module.css";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import { devLog, handleApiErrors } from "../../../utils/errorUtils";
import { sendFormSubmitButtonStyles } from "../../../constants/stylesConstants";
import FormSubmitButton from "../../FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../ErrorModal/ErrorModal";

const CreateGroupMemberForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  // Get refresh and groupCode from context
  const { refreshGroupMembers, groupCode } = useGroupMembersContext();

  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim()) return;
    setError(null);

    try {
      await apiClient.post(`/users`, {
        userName,
        groupCode,
      });

      setUserName("");
      if (refreshGroupMembers) await refreshGroupMembers();
    } catch (error) {
      if (error.response) {
        handleApiErrors(error, setError, "users", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        devLog("Error creating user.", error);
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
          onChange={(e) => setUserName(e.target.value)}
          placeholder={t("create-group-members-membername-placeholder")}
          className={styles.inputField}
          ref={inputRef}
          autoFocus
        />
        <FormSubmitButton {...sendFormSubmitButtonStyles} />
      </form>

      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible || !!error}
      />
    </div>
  );
};

export default CreateGroupMemberForm;
