import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { devLog, handleApiErrors } from "@client-utils/errorUtils";
import { sendFormSubmitButtonStyles } from "@client-constants/stylesConstants";

import useErrorModalVisibility from "@hooks/useErrorModalVisibility";

import ErrorModal from "@components/ErrorModal/ErrorModal";
import FormSubmitButton from "@components/FormSubmitButton/FormSubmitButton";

import styles from "./CreateGroupMemberForm.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CreateGroupMemberForm = ({ incrementRerenderTrigger, groupCode }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/users`, {
        userName,
        groupCode,
      });

      devLog("User created:", response);
      setUserName("");
      incrementRerenderTrigger();
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
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default CreateGroupMemberForm;
