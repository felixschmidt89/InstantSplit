import { useState } from "react";
import axios from "axios";
import { FormControlLabel, Switch } from "@mui/material";
import { useTranslation } from "react-i18next";

import styles from "./ChangeDataPurgeSetting.module.css";
import { useGlobalError } from "../../../context/ErrorContext.jsx";
import { API_URL } from "../../../constants/apiConstants";
import { devLog } from "../../../utils/errorUtils";
import { INACTIVE_DAYS } from "../../../constants/dataConstants";

const ChangeDataPurgeSetting = ({ groupCode, inactiveDataPurge }) => {
  const { t } = useTranslation();
  const { showError } = useGlobalError();

  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(inactiveDataPurge);

  const handleToggleClick = async () => {
    try {
      const updatedIsActive = !isActive;
      setIsActive(updatedIsActive);

      const response = await axios.patch(
        `${API_URL}/groups/inactiveDataPurge/${groupCode}`,
        {
          groupCode,
          inactiveDataPurge: updatedIsActive,
        },
      );

      devLog("inactiveDataPurge setting updated:", response);
    } catch (apiError) {
      const errorMessage = t("generic-error-message");
      setError(errorMessage);
      devLog("Error updating inactive group data purge setting:", apiError);
      showError(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{t("change-data-purge-setting-header")}</h2>

      <div className={styles.box}>
        <p className={styles.explanation}>
          {t("change-data-purge-setting-explanation", {
            days: INACTIVE_DAYS,
          })}
        </p>

        <form onSubmit={handleToggleClick} className={styles.toggle}>
          <FormControlLabel
            value='bottom'
            control={
              <Switch
                checked={isActive}
                onChange={handleToggleClick}
                size='small'
              />
            }
          />
        </form>
      </div>
    </div>
  );
};

export default ChangeDataPurgeSetting;
