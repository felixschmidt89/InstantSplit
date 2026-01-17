import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { useTranslation } from "react-i18next";
import {
  setGroupCodeToCurrentlyActive,
  storeGroupCodeInLocalStorage,
} from "../../utils/localStorageUtils";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";
import Spinner from "../../components/common/Spinner/Spinner";
import { ROUTES } from "../../constants/routesConstants";
import styles from "./ValidateProvidedGroupCodePage.module.css";

const ValidateProvideGroupCodePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { groupCode } = useParams();
  const [error, setError] = useState(null);
  const { groupExists, error: validationError } = useValidateGroupExistence(
    groupCode,
    "limited",
  );

  const { previousRoute } = useGetPreviousRoutesFromLocalStorage();

  const isInstantSplitUser = !!previousRoute?.includes(ROUTES.MANAGE_GROUPS);
  useEffect(() => {
    if (groupExists) {
      storeGroupCodeInLocalStorage(groupCode);
      setGroupCodeToCurrentlyActive(groupCode);

      const timeoutId = setTimeout(() => {
        navigate(ROUTES.INSTANT_SPLIT);
      }, 2500);

      return () => clearTimeout(timeoutId);
    } else if (validationError) {
      setError(validationError);
    }
  }, [groupExists, groupCode, navigate, validationError]);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("validate-groupcode-page-title")} />
      <PiratePx COUNT_IDENTIFIER='groupCode-validator' />
      {isInstantSplitUser ? (
        <InAppNavigationBar
          back
          backRoute={ROUTES.MANAGE_GROUPS}
          home
          homeRoute={ROUTES.INSTANT_SPLIT}
        />
      ) : (
        <InAppNavigationBar
          back
          backRoute={ROUTES.ONBOARDING.ENTER_GROUPCODE}
          home
          homeRoute={ROUTES.HOME}
        />
      )}
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
