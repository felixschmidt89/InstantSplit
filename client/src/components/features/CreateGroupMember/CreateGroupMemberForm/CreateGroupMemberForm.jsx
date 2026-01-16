// React and Third-Party Libraries
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog, handleApiErrors } from "../../../../utils/errorUtils";
import { sendFormSubmitButtonStyles } from "../../../../constants/stylesConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import ErrorModal from "../../../common/ErrorModal/ErrorModal";
import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";

// Styles
import styles from "./CreateGroupMemberForm.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for creating a new group member.
 *
 * @param {Object} props - The properties of the component.
 * @param {function} props.incrementRerenderTrigger - Function to trigger rerender in parent component.
 * @returns {JSX.Element} React component. */
const CreateGroupMemberForm = ({ incrementRerenderTrigger, groupCode }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
      setError("");
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

  return (
    <>
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
    </>
  );
};

export default CreateGroupMemberForm;
