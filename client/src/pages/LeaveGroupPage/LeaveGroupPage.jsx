import { useNavigate, useParams } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import styles from "./LeaveGroupPage.module.css";
import { useGroupContext } from "../../context/GroupContext";
import useConfirmationModalLogicAndActions from "../../hooks/useConfirmationModalLogicAndActions";
import deleteNestedPreviousRouteFromLocalStorage from "../../utils/localStorage/deleteNestedPreviousRouteFromLocalStorage.js";
import deletePreviousRouteFromLocalStorage from "../../utils/localStorage/deletePreviousRouteFromLocalStorage.js";
import deleteStoredViewFromLocalStorage from "../../utils/localStorage/deleteStoredViewFromLocalStorage.js";
import TO from "../../constants/clientRouteLinks.js";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CopyToClipboard from "../../components/CopyToClipboard/CopyToClipboard";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { buttonStyles } from "../../constants/stylesConstants";

const { INSTANT_SPLIT } = TO;

const LeaveGroupPage = () => {
  const { groupName, groupCode } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { removeGroup } = useGroupContext();

  const {
    isConfirmationVisible,
    handleConfirmation,
    handleShowConfirmation,
    handleHideConfirmation,
  } = useConfirmationModalLogicAndActions([
    () => deleteStoredViewFromLocalStorage(),
    () => deletePreviousRouteFromLocalStorage(),
    () => deleteNestedPreviousRouteFromLocalStorage(),
    () => removeGroup(groupCode),
    () => navigate(INSTANT_SPLIT),
  ]);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("leave-group-on-device-page-title")} />
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
