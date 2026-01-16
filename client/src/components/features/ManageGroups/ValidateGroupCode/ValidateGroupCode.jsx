import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { submitOnEnterClick } from "../../../../utils/formUtils";
import { sendFormSubmitButtonStyles } from "../../../../constants/stylesConstants";

import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";

import styles from "./ValidateGroupCode.module.css";

const ValidateGroupCode = ({ isExistingUser = false }) => {
  const { t } = useTranslation();
  // const groupCode = localStorage.getItem("activeGroupCode");
  const [toBeValidatedGroupCode, setToBeValidatedGroupCode] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!toBeValidatedGroupCode.trim()) {
      setError("missing groupcode");
      displayErrorModal();
    } else {
      navigate(`/groupCode-validator/${toBeValidatedGroupCode}`);
    }
  };

  const handleKeyDown = (e) => {
    submitOnEnterClick(e, handleFormSubmit);
  };

  return (
    <div className={styles.container}>
      <h2>
        {isExistingUser
          ? t("validate-groupcode-join-group-copy")
          : t("validate-groupcode-enter-groupcode-copy")}
      </h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.inputField}
          type='text'
          placeholder={
            isExistingUser
              ? t("validate-groupcode-enter-groupcode-copy")
              : "L54N21ST4N1L17T"
          }
          value={toBeValidatedGroupCode}
          onChange={(e) => setToBeValidatedGroupCode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* TODO: Re-enable FriendlyCaptcha validation & ensure it's working on test deploy too */}
        {/* For new users: only render submit button, if FriendlyCaptcha is verified*/}
        {/* {(friendlyCaptchaIsVerified || groupCode) && (
          <FormSubmitButton {...sendFormSubmitButtonStyles} />
        )} */}
        {/* For new users: render FriendlyCaptcha*/}
        {/* {!isExistingUser && (
          <FriendlyCaptcha
            sitekey={import.meta.env.VITE_FRIENDLY_CAPTCHA_SITEKEY}
            secret={import.meta.env.VITE_FRIENDLY_CAPTCHA_SECRET}
            setFriendlyCaptchaIsVerified={setFriendlyCaptchaIsVerified}
          />
        )} */}
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

export default ValidateGroupCode;
