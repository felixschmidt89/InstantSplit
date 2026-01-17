import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  setGroupCodeToCurrentlyActive,
  storeGroupCodeInLocalStorage,
  isGroupCodeInStoredGroupCodes,
} from "../../../../utils/localStorageUtils";
import { buttonStyles } from "../../../../constants/stylesConstants";
import TermsAndConditionsSection from "../../Home/TermsAndConditionsSection/TermsAndConditionsSection";
import styles from "./AcceptGroupInvitation.module.css";

const AcceptGroupInvitation = ({ groupName, groupCode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isGroupCodeInStoredGroupCodes(groupCode)) {
      setGroupCodeToCurrentlyActive(groupCode);
      navigate("/instant-split");
    }
  }, [groupCode, navigate]);

  const onInvitationAccept = () => {
    storeGroupCodeInLocalStorage(groupCode);
    setGroupCodeToCurrentlyActive(groupCode);
    navigate("/instant-split");
  };

  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Button
          style={buttonStyles}
          onClick={onInvitationAccept}
          variant='outlined'>
          {t("join-group-button-text")}
        </Button>
      </div>
      <div className={styles.termsAndConditions}>
        <TermsAndConditionsSection />
      </div>
    </div>
  );
};

export default AcceptGroupInvitation;
