import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGlobalError } from "../../context/ErrorContext.jsx";
import { submitOnEnter } from "../../utils/form/submitOnEnter.js";
import TO from "../../constants/clientRouteLinks.js";
import FormSubmitButton from "../FormSubmitButton/FormSubmitButton.jsx";
import styles from "./ChangeResourceName.module.css";
import useUpdateResource from "../../hooks/useUpdateResource.jsx";
import STYLES from "../../constants/stylesConstants.jsx";

const { INSTANT_SPLIT } = TO.STATIC;
const { sendFormSubmitButtonStyles } = STYLES;

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

  // Use the global trigger instead of local state
  const { showError } = useGlobalError();

  const [newResourceName, setNewResourceName] = useState(resourceName);
  const pluralResourceType = `${resourceType}s`;

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
      showError(hookError ? t(hookError) : t("generic-error-message"));
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
    </div>
  );
};

export default ChangeResourceName;
