import { useState } from "react";
import axios from "axios";
import { FormControlLabel, Switch } from "@mui/material";
import { useTranslation } from "react-i18next";

import { INACTIVE_DAYS } from "@client-constants/dataConstants";

import useErrorModalVisibility from "@hooks/useErrorModalVisibility";

import ErrorModal from "@components/ErrorModal/ErrorModal";

import styles from "./ChangeDataPurgeSetting.module.css";
import { devLog } from "@/utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ChangeDataPurgeSetting = ({ groupCode, inactiveDataPurge }) => {
  const { t } = useTranslation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(inactiveDataPurge);

  const handleToggleClick = async () => {
    try {
      const updatedIsActive = !isActive;
      setIsActive(updatedIsActive);

      const response = await axios.patch(
        `${apiUrl}/groups/inactiveDataPurge/${groupCode}`,
        {
          groupCode,
          inactiveDataPurge: updatedIsActive,
        },
      );

      devLog("inactiveDataPurge setting updated:", response);
    } catch (error) {
      setError(t("generic-error-message"));
      devLog("Error updating inactive group data purge setting:", error);
      displayErrorModal();
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

      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default ChangeDataPurgeSetting;
