import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";

import styles from "./ValidateProvidedGroupCodePage.module.css";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence.jsx";
import {
  getPreviousRouteFromLocalStorage,
  setActiveGroupCodeInLocalStorage,
  storeGroupCodeInLocalStorage,
} from "../../utils/localStorage/index.js";
import { useGroupContext } from "../../context/GroupContext.jsx";
import { CLIENT_STATIC_ROUTES } from "../../constants/clientStaticRoutesConstants.js";
import { TO } from "../../constants/navigationConstants.js";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify.jsx";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar.jsx";
import ErrorDisplay from "../../components/ErrorDisplay/ErrorDisplay.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";

const { MANAGE_GROUPS, ONBOARDING_ENTER_GROUPCODE } = CLIENT_STATIC_ROUTES;

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

  const backDestination = isExistingInstantSplitUser
    ? MANAGE_GROUPS
    : ONBOARDING_ENTER_GROUPCODE;

  const homeDestination = isExistingInstantSplitUser
    ? TO.INSTANT_SPLIT
    : TO.HOME;

  useEffect(() => {
    if (groupExists) {
      storeGroupCodeInLocalStorage(groupCode);
      setActiveGroupCodeInLocalStorage(groupCode);
      setActiveGroupCode(groupCode);

      const timeoutId = setTimeout(() => {
        navigate(TO.INSTANT_SPLIT);
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
        backTo={backDestination}
        home
        homeTo={homeDestination}
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
