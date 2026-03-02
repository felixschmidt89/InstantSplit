import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";

import styles from "./ValidateProvidedGroupCodePage.module.css";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import {
  getPreviousRouteFromLocalStorage,
  setActiveGroupCodeInLocalStorage,
  storeGroupCodeInLocalStorage,
} from "../../utils/localStorage";
import { useGroupContext } from "../../context/GroupContext";
import { CLIENT_ROUTES } from "../../constants/clientRoutesConstants";
import { TO } from "../../constants/navigationConstants";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ErrorDisplay from "../../components/ErrorDisplay/ErrorDisplay";
import Spinner from "../../components/Spinner/Spinner";

const { ONBOARDING, MANAGE_GROUPS } = CLIENT_ROUTES;
const { INSTANT_SPLIT, HOME } = TO;

const ValidateProvidedGroupCodePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { groupCode } = useParams();
  const [error, setError] = useState(null);

  const { setActiveGroupCode } = useGroupContext();

  const { groupExists, error: validationError } = useValidateGroupExistence(
    groupCode,
    "limited",
  );

  const previousRoute = getPreviousRouteFromLocalStorage();

  const isExistingInstantSplitUser = Boolean(
    previousRoute?.includes(MANAGE_GROUPS),
  );

  useEffect(() => {
    if (groupExists) {
      storeGroupCodeInLocalStorage(groupCode);
      setActiveGroupCodeInLocalStorage(groupCode);

      setActiveGroupCode(groupCode);

      const timeoutId = setTimeout(() => {
        navigate(INSTANT_SPLIT);
      }, 2500);

      return () => clearTimeout(timeoutId);
    }

    if (validationError) {
      setError(validationError);
    }
  }, [groupExists, groupCode, navigate, validationError, setActiveGroupCode]);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("validate-groupcode-page-title")} />

      <InAppNavigationBar
        back
        backTo={
          isExistingInstantSplitUser
            ? MANAGE_GROUPS
            : ONBOARDING.ENTER_GROUPCODE
        }
        home
        homeTo={isExistingInstantSplitUser ? INSTANT_SPLIT : HOME}
      />

      <div className={styles.container}>
        <h1>{t("validate-groupcode-page-header")}</h1>

        {groupExists && (
          <div className={styles.groupExists}>
            <div className={styles.feedbackIcon}>
              <IoMdCheckmarkCircleOutline />
            </div>
            <p>{t("validate-groupcode-page-redirect-copy")}</p>
          </div>
        )}

        {!error && !groupExists && <Spinner />}

        {error && (
          <div className={styles.groupDoesNotExist}>
            <div className={styles.feedbackIcon}>
              <IoMdCloseCircleOutline />
            </div>
            <ErrorDisplay error={error} remWidth={30} errorFontColor />
          </div>
        )}
      </div>
    </main>
  );
};

export default ValidateProvidedGroupCodePage;
