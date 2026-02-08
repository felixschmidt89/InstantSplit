import { useEffect } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import useAppNavigate from "../../../hooks/useAppNavigate";
import { buttonStyles } from "../../../constants/stylesConstants";
import { ROUTES } from "../../../constants/routesConstants";
import {
  isGroupCodeInStoredGroupCodes,
  setActiveGroupCode,
  storeGroupCode,
} from "../../../utils/localStorage";

import TermsAndConditionsSection from "../../Home/TermsAndConditionsSection/TermsAndConditionsSection";
import styles from "./AcceptGroupInvitation.module.css";

const AcceptGroupInvitation = ({ groupName, groupCode }) => {
  const navigate = useAppNavigate();
  const { t } = useTranslation();

  const onInvitationAccept = () => {
    storeGroupCode(groupCode);
    setActiveGroupCode(groupCode);
    navigate(ROUTES.INSTANT_SPLIT);
  };

  useEffect(() => {
    if (isGroupCodeInStoredGroupCodes(groupCode)) {
      setActiveGroupCode(groupCode);
      navigate(ROUTES.INSTANT_SPLIT);
    }
  }, [groupCode, navigate]);

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
