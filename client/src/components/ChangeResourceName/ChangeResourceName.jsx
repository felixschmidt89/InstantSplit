import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import useErrorModalVisibility from "../../hooks/useErrorModalVisibility";
import useUpdateResource from "../../hooks/useUpdateResource";
import { submitOnEnter } from "../../utils/form/submitOnEnter";
import { sendFormSubmitButtonStyles } from "../../constants/stylesConstants";
import { ROUTES } from "../../constants/routesConstants";
import FormSubmitButton from "../FormSubmitButton/FormSubmitButton";
import ErrorModal from "../ErrorModal/ErrorModal";

import styles from "./ChangeResourceName.module.css";

const { INSTANT_SPLIT } = ROUTES;

const ChangeResourceName = ({
  resourceId,
  resourceType,
  resourceName,
  groupCode,
  headerText,
  inputWidth = 20,
  navigateToMain = true,
  callback,
}) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [newResourceName, setNewResourceName] = useState(resourceName);

  const pluralResourceType = `${resourceType}s`;
  const navigationTarget = navigateToMain ? INSTANT_SPLIT : null;

  const updatePayload = {
    [resourceType]: resourceId,
    [`${resourceType}Name`]: newResourceName,
    groupCode,
  };

  const { updateResource, error: hookError } = useUpdateResource(
    pluralResourceType,
    resourceId,
    navigationTarget,
    () => callback?.(newResourceName),
  );

  const hasHookError = Boolean(hookError);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateResource(updatePayload);

      if (inputRef.current) {
        inputRef.current.classList.remove(styles.active);
        inputRef.current.blur();
      }
    } catch (apiError) {
      displayErrorModal();
    }
  };

  const handleInputClick = () => {
    inputRef.current.classList.add(styles.active);
  };

  const handleInputChange = (event) => {
    setNewResourceName(event.target.value);
  };

  return (
    <div className={styles.container}>
      {headerText && <h2 className={styles.header}>{headerText}</h2>}

      <form onSubmit={handleFormSubmit}>
        <input
          className={`${styles.inputField} ${styles.idleOnMount}`}
          type='text'
          value={newResourceName}
          onClick={handleInputClick}
          onChange={handleInputChange}
          placeholder={resourceName}
          style={{ width: `${inputWidth}rem` }}
          ref={inputRef}
          onKeyDown={submitOnEnter(handleFormSubmit)}
        />
        <FormSubmitButton {...sendFormSubmitButtonStyles} />
      </form>

      <ErrorModal
        error={hasHookError && t(hookError)}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default ChangeResourceName;
