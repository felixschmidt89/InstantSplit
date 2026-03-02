import { useState } from "react";
import { useTranslation } from "react-i18next";

import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import { submitOnEnter } from "../../../utils/form/submitOnEnter";
import FormSubmitButton from "../../FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../ErrorModal/ErrorModal";
import { sendFormSubmitButtonStyles } from "../../../constants/stylesConstants";

import styles from "./ValidateGroupCode.module.css";
import { useNavigate } from "react-router-dom";

const ValidateGroupCode = ({ isExistingUser = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [toBeValidatedGroupCode, setToBeValidatedGroupCode] = useState("");
  const [error, setError] = useState(null);

  const isGroupCodeEmpty = !toBeValidatedGroupCode.trim();
  const headerText = isExistingUser
    ? t("validate-groupcode-join-group-copy")
    : t("validate-groupcode-enter-groupcode-copy");
  const inputPlaceholder = isExistingUser
    ? t("validate-groupcode-enter-groupcode-copy")
    : "L54N21ST4N1L17T";

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (isGroupCodeEmpty) {
      setError("missing groupcode");
      displayErrorModal();
      return;
    }

    navigate(`/groupCode-validator/${toBeValidatedGroupCode}`);
  };

  const handleInputChange = (event) => {
    setToBeValidatedGroupCode(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>{headerText}</h2>

      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.inputField}
          type='text'
          placeholder={inputPlaceholder}
          value={toBeValidatedGroupCode}
          onChange={handleInputChange}
          onKeyDown={submitOnEnter(handleFormSubmit)}
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

export default ValidateGroupCode;
