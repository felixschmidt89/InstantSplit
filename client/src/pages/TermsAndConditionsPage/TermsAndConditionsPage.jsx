// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Hooks
import useGetPreviousRouteFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";

// Components
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/PiratePx/PiratePx";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions/TermsAndConditions";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./TermsAndConditionsPage.module.css";

const TermsAndConditionsPage = () => {
  const { t } = useTranslation();

  // Check if current user is an invited user, ie is redirected from join-instantsplit-group route
  const { previousRoute, isRetrieved } = useGetPreviousRouteFromLocalStorage();

  const isInvitedUser =
    previousRoute && isRetrieved
      ? previousRoute.includes("join-instantsplit-group/")
      : false;

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("terms-and-conditions-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"terms-and-conditions"} />
      {/* Navigate invited users back to accept group invitation page */}
      {isRetrieved && isInvitedUser && (
        <InAppNavigationBar previousRoute={true} />
      )}
      {isRetrieved && !isInvitedUser && <InAppNavigationBar back={true} />}
      <div className={styles.container}>
        <TermsAndConditions />
      </div>
    </main>
  );
};

export default TermsAndConditionsPage;
