import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
// import "friendly-challenge/widget";

import { devLog, handleApiErrors } from "../../../../../utils/errorUtils";
import {
  setGroupCodeToCurrentlyActive,
  setRouteInLocalStorage,
  storeGroupCodeInLocalStorage,
} from "../../../../../utils/localStorageUtils";
import { plusFormSubmitButtonStyles } from "../../../../../constants/stylesConstants";
import { replaceSlashesWithDashes } from "../../../../../utils/replaceSlashesWithDashes";

import useErrorModalVisibility from "../../../../../hooks/useErrorModalVisibility";

import FormSubmitButton from "../../../../common/FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../../../common/ErrorModal/ErrorModal";
// import FriendlyCaptcha from "../../../../common/FriendlyCaptcha/FriendlyCaptcha";

import styles from "./CreateGroupForm.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CreateGroupForm = ({ isExistingUser = false }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [groupName, setGroupName] = useState(null);
  const [error, setError] = useState(null);
  // const [friendlyCaptchaIsVerified, setFriendlyCaptchaIsVerified] =
  //   useState(false);

  devLog("Is existing user", isExistingUser);

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  useEffect(() => {
    if (!isExistingUser) {
      inputRef.current.focus();
    }
  }, [isExistingUser]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("apiURL", apiUrl);
    setError(null);
    try {
      const response = await axios.post(`${apiUrl}/groups`, {
        groupName,
      });
      devLog("Group created:", response);
      const { groupCode } = response.data.group;
      storeGroupCodeInLocalStorage(groupCode);
      setGroupCodeToCurrentlyActive(groupCode);
      setRouteInLocalStorage(window.location.pathname, "previousRoute");
      navigate("/create-group-members");
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
      {/* For new users: only render submit button, if FriendlyCaptcha is verified*/}
      {/* {(friendlyCaptchaIsVerified || isExistingUser) && (
        <FormSubmitButton {...plusFormSubmitButtonStyles} />
      )} */}
      {/* For new users: render FriendlyCaptcha*/}
      {/* {!isExistingUser && (
        <FriendlyCaptcha
          sitekey={import.meta.env.VITE_FRIENDLY_CAPTCHA_SITEKEY}
          secret={import.meta.env.VITE_FRIENDLY_CAPTCHA_SECRET}
          setFriendlyCaptchaIsVerified={setFriendlyCaptchaIsVerified}
        />
      )} */}
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
