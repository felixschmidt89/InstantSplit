import { useNavigate, useParams } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import styles from "./LeaveGroupPage.module.css";
import useConfirmationModalLogicAndActions from "../../hooks/useConfirmationModalLogicAndActions";
import {
  deleteGroupCode,
  deleteNestedPreviousRoute,
  deletePreviousRoute,
  deleteStoredView,
  getFirstGroupCode,
  setActiveGroupCode,
} from "../../utils/localStorage";
import { ROUTES } from "../../constants/routesConstants";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CopyToClipboard from "../../components/CopyToClipboard/CopyToClipboard";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { buttonStyles } from "../../constants/stylesConstants";

const LeaveGroupPage = () => {
  const { groupName, groupCode } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    isConfirmationVisible,
    handleConfirmation,
    handleShowConfirmation,
    handleHideConfirmation,
  } = useConfirmationModalLogicAndActions([
    () => deleteStoredView(),
    () => deletePreviousRoute(),
    () => deleteNestedPreviousRoute(),
    () => deleteGroupCode(groupCode),
    () => {
      const newGroupCode = getFirstGroupCode();
      if (newGroupCode) setActiveGroupCode(newGroupCode);
    },
    () => {
      navigate(`/${ROUTES.INSTANT_SPLIT}`);
    },
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
