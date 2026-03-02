import { useEffect } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import TermsAndConditionsSection from "../../Home/TermsAndConditionsSection/TermsAndConditionsSection";
import { buttonStyles } from "../../../constants/stylesConstants";
import { TO } from "../../../constants/navigationConstants";
import {
  isGroupCodeInStoredGroupCodes,
  setActiveGroupCodeInLocalStorage,
  storeGroupCode,
} from "../../../utils/localStorage";
import { useGroupContext } from "../../../context/GroupContext";

import styles from "./AcceptGroupInvitation.module.css";

const { INSTANT_SPLIT } = TO;

const AcceptGroupInvitation = ({ groupName, groupCode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setActiveGroupCode } = useGroupContext();

  const onInvitationAccept = () => {
    storeGroupCode(groupCode);

    setActiveGroupCodeInLocalStorage(groupCode);
    setActiveGroupCode(groupCode);

    navigate(INSTANT_SPLIT);
  };

  useEffect(() => {
    if (isGroupCodeInStoredGroupCodes(groupCode)) {
      setActiveGroupCodeInLocalStorage(groupCode);
      setActiveGroupCode(groupCode);

      navigate(INSTANT_SPLIT);
    }
  }, [groupCode, navigate, setActiveGroupCode]);

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
