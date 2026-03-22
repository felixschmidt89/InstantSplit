import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "./GroupSelection.module.css";
import { useGroupContext } from "../../../../context/GroupContext.jsx";
import sendFormSubmitButtonStyles from "../../../../constants/stylesConstants.jsx";
import TO from "../../../../constants/clientRouteLinks.js";
import setActiveGroupCodeInLocalStorage from "../../../../utils/localStorage/setActiveGroupCodeInLocalStorage.js";
import { submitOnEnter } from "../../../../utils/form/submitOnEnter.js";
import FormSubmitButton from "../../../FormSubmitButton/FormSubmitButton.jsx";

const { INSTANT_SPLIT } = TO;

const GroupSelection = ({ groupNamesAndGroupCodes }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setActiveGroupCode } = useGroupContext();
  const [selectedGroupCode, setSelectedGroupCode] = useState("");

  const handleSelectChange = (event) => {
    setSelectedGroupCode(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedGroupCode) {
      setActiveGroupCodeInLocalStorage(selectedGroupCode);

      setActiveGroupCode(selectedGroupCode);

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
