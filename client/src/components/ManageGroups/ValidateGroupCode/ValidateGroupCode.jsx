import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./ValidateGroupCode.module.css";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import { submitOnEnterClick } from "../../../utils/formUtils";
import FormSubmitButton from "../../FormSubmitButton/FormSubmitButton";
import { sendFormSubmitButtonStyles } from "../../../constants/stylesConstants";
import ErrorModal from "../../ErrorModal/ErrorModal";

const ValidateGroupCode = ({ isExistingUser = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [toBeValidatedGroupCode, setToBeValidatedGroupCode] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!toBeValidatedGroupCode?.trim()) {
      setError("missing groupcode");
      displayErrorModal();
      return;
    }

    navigate(`/groupCode-validator/${toBeValidatedGroupCode}`);
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
