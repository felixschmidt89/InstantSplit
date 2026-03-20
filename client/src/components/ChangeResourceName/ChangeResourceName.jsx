import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import useErrorModalVisibility from "../../hooks/useErrorModalVisibility";
import useUpdateResource from "../../hooks/useUpdateResource";
import { submitOnEnter } from "../../utils/form/submitOnEnter";
import { sendFormSubmitButtonStyles } from "../../constants/stylesConstants";

import TO from "../../constants/clientRouteLinks.js";
import FormSubmitButton from "../FormSubmitButton/FormSubmitButton";
import ErrorModal from "../ErrorModal/ErrorModal";

import styles from "./ChangeResourceName.module.css";

const { INSTANT_SPLIT } = TO.STATIC;

const ChangeResourceName = ({
  resourceId,
  resourceType,
  resourceName,
  groupCode,
  headerText,
  inputWidth = 20,
  enableRedirect = true,
  redirectRoute = INSTANT_SPLIT,
  callback,
}) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [newResourceName, setNewResourceName] = useState(resourceName);

  const pluralResourceType = `${resourceType}s`;

  // TODO: Improve
  const updatePayload = {
    [`${resourceType}Id`]: resourceId,
    [`${resourceType}Name`]: newResourceName,
    groupCode,
  };

  const { updateResource, error: hookError } = useUpdateResource(
    pluralResourceType,
    resourceId,
    enableRedirect ? redirectRoute : undefined,
    () => callback?.(newResourceName),
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateResource(updatePayload);
      inputRef.current?.blur();
    } catch (apiError) {
      displayErrorModal();
    }
  };

  const handleInputChange = (event) => {
    setNewResourceName(event.target.value);
  };

  return (
    <div className={styles.container}>
      {headerText && <h2 className={styles.header}>{headerText}</h2>}

      <form onSubmit={handleFormSubmit}>
        <input
          className={`${styles.inputField} ${styles.idleOnMount || ""}`.trim()}
          type='text'
          value={newResourceName}
          onChange={handleInputChange}
          placeholder={resourceName}
          style={{ width: `${inputWidth}rem` }}
          ref={inputRef}
          onKeyDown={submitOnEnter(handleFormSubmit)}
        />
        <FormSubmitButton {...sendFormSubmitButtonStyles} />
      </form>

      <ErrorModal
        error={Boolean(hookError) && t(hookError)}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default ChangeResourceName;
