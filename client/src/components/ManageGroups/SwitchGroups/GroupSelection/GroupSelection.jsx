import { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./GroupSelection.module.css";
import { useGroupContext } from "../../../../context/GroupContext.jsx";
import useAppNavigate from "../../../../hooks/useAppNavigate.jsx";
import { sendFormSubmitButtonStyles } from "../../../../constants/stylesConstants.jsx";
import { TO } from "../../../../constants/navigationConstants.js";
import { setActiveGroupCode } from "../../../../utils/localStorage/index.js";
import { submitOnEnter } from "../../../../utils/form/submitOnEnter.js";
import FormSubmitButton from "../../../FormSubmitButton/FormSubmitButton.jsx";

const { INSTANT_SPLIT } = TO;

const GroupSelection = ({ groupNamesAndGroupCodes }) => {
  const navigate = useAppNavigate();
  const { t } = useTranslation();
  const { updateActiveGroup } = useGroupContext();
  const [selectedGroupCode, setSelectedGroupCode] = useState("");

  const handleSelectChange = (event) => {
    setSelectedGroupCode(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedGroupCode) {
      setActiveGroupCode(selectedGroupCode);
      updateActiveGroup(selectedGroupCode);

      navigate(INSTANT_SPLIT);
    }
  };

  const handleKeyDown = (event) => {
    submitOnEnter(event, handleFormSubmit);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <select
          className={styles.groupSelection}
          value={selectedGroupCode}
          onChange={handleSelectChange}
          onKeyDown={handleKeyDown}>
          <option value='' disabled={!groupNamesAndGroupCodes?.length}>
            {t("render-group-selection-placeholder")}
          </option>
          {groupNamesAndGroupCodes?.map((group) => (
            <option key={group.groupCode} value={group.groupCode}>
              {group.groupName}
            </option>
          ))}
        </select>
        <FormSubmitButton {...sendFormSubmitButtonStyles} />
      </form>
    </div>
  );
};

export default GroupSelection;
