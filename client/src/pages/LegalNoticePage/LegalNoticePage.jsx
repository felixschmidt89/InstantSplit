import { useTranslation } from "react-i18next";

import { getPreviousRoute } from "@/utils/localStorage/index.js";

import HelmetMetaTagsNetlify from "@components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "@components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import LegalNoticeAuthor from "@components/LegalNotice/LegalNoticeAuthor/LegalNoticeAuthor";
import LegalNoticeSections from "@components/LegalNotice/LegalNoticeSections/LegalNoticeSections";

import styles from "./LegalNoticePage.module.css";
import { authorInfo, legalNoticeSections } from "@/contents/legalNoticeContent";

const LegalNoticePage = () => {
  const { t } = useTranslation();

  const previousRoute = getPreviousRoute();

  const isInvitedUser = previousRoute?.includes("join-instantsplit-group/");

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={t("legal-notice-page-title")}
        description={t("legal-notice-page-description")}
      />

      <InAppNavigationBar previousRoute={isInvitedUser} back={!isInvitedUser} />

      <div className={styles.container}>
        <h1>{t("legal-notice-page-header")}</h1>
        <p className={styles.note}>{t("legal-notice-page-explanation")} </p>
        <LegalNoticeAuthor authorInfo={authorInfo} />
        <LegalNoticeSections legalNoticeSections={legalNoticeSections} />
      </div>
    </main>
  );
};

export default LegalNoticePage;
