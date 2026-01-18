// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Contents
import {
  authorInfo,
  legalNoticeSections,
} from "../../contents/legalNoticeContent";

// Hooks
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";

//Components
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import LegalNoticeAuthor from "../../components/LegalNotice/LegalNoticeAuthor/LegalNoticeAuthor";
import LegalNoticeSections from "../../components/LegalNotice/LegalNoticeSections/LegalNoticeSections";

// Styles
import styles from "./LegalNoticePage.module.css";

const LegalNoticePage = () => {
  const { t } = useTranslation();

  // Check if current user is an invited user, ie is redirected from join-instantsplit-group route
  const { previousRoute, isRetrieved } = useGetPreviousRoutesFromLocalStorage();
  const isInvitedUser =
    previousRoute && isRetrieved
      ? previousRoute.includes("join-instantsplit-group/")
      : false;

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={t("legal-notice-page-title")}
        description={t("legal-notice-page-description")}
      />
      <PiratePx COUNT_IDENTIFIER={"legal-notice"} />
      {/* Navigate invited users back to accept group invitation page */}
      {isRetrieved && isInvitedUser && (
        <InAppNavigationBar previousRoute={true} />
      )}
      {isRetrieved && !isInvitedUser && <InAppNavigationBar back={true} />}
      <div className={styles.container}>
        <h1>{t("legal-notice-page-header")}</h1>
        <p className={styles.note}>{t("legal-notice-page-explanation")} </p>
        <LegalNoticeAuthor authorInfo={authorInfo} />
        <LegalNoticeSections LegalNoticeSections={legalNoticeSections} />
      </div>
    </main>
  );
};

export default LegalNoticePage;
