// React and Third-Party Libraries
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

// Constants and Utils
import {
  deleteApplicationDataFromLocalStorage,
  deleteGroupDataFromLocalStorage,
  getFirstGroupCodeInStoredGroupCodesArray,
  setGroupCodeToCurrentlyActive,
} from "../../utils/localStorageUtils";
import { buttonStyles } from "../../constants/stylesConstants";

// Hooks
import useConfirmationModalLogicAndActions from "../../hooks/useConfirmationModalLogicAndActions";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import CopyToClipboard from "../../components/common/CopyToClipboard/CopyToClipboard";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ConfirmationModal from "../../components/common/ConfirmationModal/ConfirmationModal";

// Styles
import styles from "./LeaveGroupPage.module.css";
import { ROUTES } from "../../constants/routesConstants";

const LeaveGroupPage = () => {
  const { groupName, groupCode } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Get confirmation modal logic from hook, pass callbacks to be executed on confirmation
  const {
    isConfirmationVisible,
    handleConfirmation,
    handleShowConfirmation,
    handleHideConfirmation,
  } = useConfirmationModalLogicAndActions([
    () => deleteApplicationDataFromLocalStorage(),
    () => deleteGroupDataFromLocalStorage(groupCode),
    () => {
      const newGroupCode = getFirstGroupCodeInStoredGroupCodesArray();
      setGroupCodeToCurrentlyActive(newGroupCode);
    },
    () => {
      navigate(ROUTES.INSTANT_SPLIT);
    },
  ]);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("leave-group-on-device-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"leave-group-on-device"} />
      <InAppNavigationBar back={true} />
      <h1 className={styles.header}>
        {t("leave-group-on-device-page-header")}
      </h1>
      <div className={styles.container}>
        <div className={styles.groupCodeContainer}>
          <div className={styles.groupCodeExplanation}>
            {t("leave-group-on-device-groupcode-explanation-part1")}
            <span className={styles.groupName}> {groupName} </span>
            {t("leave-group-on-device-groupcode-explanation-part2")}
          </div>
          <div className={styles.copyGroupCode}>
            <CopyToClipboard infoToCopy={groupCode} />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button
            style={buttonStyles}
            variant='contained'
            color='error'
            onClick={handleShowConfirmation}
            endIcon={<ExitToAppIcon />}>
            {t("leave-group-on-device-page-button")}
          </Button>
          {isConfirmationVisible && (
            <ConfirmationModal
              message={t("leave-group-on-device-confirmation-message")}
              onConfirm={handleConfirmation}
              onCancel={handleHideConfirmation}
              isVisible={isConfirmationVisible}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default LeaveGroupPage;
