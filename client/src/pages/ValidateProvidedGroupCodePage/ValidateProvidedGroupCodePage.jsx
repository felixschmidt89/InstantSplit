import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";

import styles from "./ValidateProvidedGroupCodePage.module.css";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import {
  getPreviousRoute,
  setActiveGroupCode,
  storeGroupCode,
} from "../../utils/localStorage";
import { ROUTES } from "../../constants/routesConstants";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ErrorDisplay from "../../components/ErrorDisplay/ErrorDisplay";
import Spinner from "../../components/Spinner/Spinner";

const ValidateProvideGroupCodePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { groupCode } = useParams();
  const [error, setError] = useState(null);

  const { groupExists, error: validationError } = useValidateGroupExistence(
    groupCode,
    "limited",
  );

  const previousRoute = getPreviousRoute();
  const isInstantSplitUser = !!previousRoute?.includes(ROUTES.MANAGE_GROUPS);

  useEffect(() => {
    if (groupExists) {
      storeGroupCode(groupCode);
      setActiveGroupCode(groupCode);

      const timeoutId = setTimeout(() => {
        navigate(`/${ROUTES.INSTANT_SPLIT}`);
      }, 2500);

      return () => clearTimeout(timeoutId);
    }

    if (validationError) {
      setError(validationError);
    }
  }, [groupExists, groupCode, navigate, validationError]);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("validate-groupcode-page-title")} />

      <InAppNavigationBar
        back
        backRoute={
          isInstantSplitUser
            ? ROUTES.MANAGE_GROUPS
            : ROUTES.ONBOARDING.ENTER_GROUPCODE
        }
        home
        homeRoute={isInstantSplitUser ? ROUTES.INSTANT_SPLIT : ROUTES.HOME}
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

export default ValidateProvideGroupCodePage;
