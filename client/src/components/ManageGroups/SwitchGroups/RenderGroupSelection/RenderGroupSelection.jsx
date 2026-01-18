import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setGroupCodeToCurrentlyActive } from "../../../../utils/localStorageUtils";
import { submitOnEnterClick } from "../../../../utils/formUtils";
import { sendFormSubmitButtonStyles } from "../../../../constants/stylesConstants";
import FormSubmitButton from "../../../FormSubmitButton/FormSubmitButton";
import { ROUTES } from "../../../../constants/routesConstants";
import styles from "./RenderGroupSelection.module.css";

const RenderGroupSelection = ({ groupCode, groupNamesAndGroupCodes }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedGroupCode, setSelectedGroupCode] = useState("");

  const handleSelectChange = (event) => {
    setSelectedGroupCode(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedGroupCode) {
      setGroupCodeToCurrentlyActive(selectedGroupCode);
      navigate(ROUTES.INSTANT_SPLIT);
    }
  };

  const handleKeyDown = (e) => {
    submitOnEnterClick(e, handleFormSubmit);
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

export default RenderGroupSelection;
