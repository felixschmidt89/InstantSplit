import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import apiClient from "../../../api/axiosInstance";
import { useGroupContext } from "../../../context/GroupContext";
import { useGlobalError } from "../../../context/ErrorContext";
import { handleApiErrors } from "../../../utils/errorUtils";
import STYLES from "../../../constants/stylesConstants";
import FormSubmitButton from "../../FormSubmitButton/FormSubmitButton";

import styles from "./CreateGroupMemberForm.module.css";
import debugLog from "../../../../../shared/utils/debug/debugLog.js";

const { sendFormSubmitButtonStyles } = STYLES;

const CreateGroupMemberForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { showError } = useGlobalError();

  const { refreshGroupMembers, activeGroupCode: groupCode } = useGroupContext();

  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

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
        handleApiErrors(apiError, setError, "users", showError, t);
      } else {
        const genericMessage = t("generic-error-message");
        setError(genericMessage);
        debugLog("Error creating user", { error: apiError.message });
        showError(genericMessage);
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
    </div>
  );
};

export default CreateGroupMemberForm;
