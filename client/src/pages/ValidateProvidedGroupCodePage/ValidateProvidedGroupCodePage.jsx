// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { useTranslation } from "react-i18next";

// Constants and Utils
import {
  setGroupCodeToCurrentlyActive,
  storeGroupCodeInLocalStorage,
} from "../../utils/localStorageUtils";

// Hooks
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";
import Spinner from "../../components/common/Spinner/Spinner";

// Styles
import styles from "./ValidateProvidedGroupCodePage.module.css";

/**
 * Validates the user's manually provided groupCode and navigates the user accordingly.
 *
 * @returns {JSX.Element} React component. */
const ValidateProvideGroupCodePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { groupCode } = useParams();
  const [error, setError] = useState(null);
  const { groupExists, error: validationError } = useValidateGroupExistence(
    groupCode,
    "limited",
  );

  // Check if current user has entered code from within main application, ie is redirected from manage-groups route
  const { previousRoute, isRetrieved } = useGetPreviousRoutesFromLocalStorage();

  const isInstantSplitUser =
    previousRoute && isRetrieved
      ? previousRoute.includes("/manage-groups")
      : false;

  useEffect(() => {
    if (groupExists) {
      storeGroupCodeInLocalStorage(groupCode);
      setGroupCodeToCurrentlyActive(groupCode);

      // Render feedback and programmatically navigate with a delay
      const timeoutId = setTimeout(() => {
        navigate("/instant-split");
      }, 2500);

      return () => clearTimeout(timeoutId);
    } else if (validationError) {
      setError(validationError);
    }
  }, [groupExists, groupCode, navigate, validationError, isInstantSplitUser]);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("validate-groupcode-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"groupCode-validator"} />
      {isInstantSplitUser ? (
        <InAppNavigationBar
          back={true}
          backRoute={"/manage-groups"}
          home={true}
          homeRoute={"/instant-split"}
        />
      ) : (
        <InAppNavigationBar
          back={true}
          backRoute={"/onboarding-enter-groupcode"}
          home={true}
          homeRoute={"/"}
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
        {/*Handle validations timeout errors*/}
        {!error && !groupExists && <Spinner />}
        {error && (
          <div className={styles.groupDoesNotExist}>
            <div className={styles.feedbackIcon}>
              <IoMdCloseCircleOutline />
            </div>
            <ErrorDisplay error={error} remWidth={30} errorFontColor={true} />
          </div>
        )}
      </div>
    </main>
  );
};
export default ValidateProvideGroupCodePage;
