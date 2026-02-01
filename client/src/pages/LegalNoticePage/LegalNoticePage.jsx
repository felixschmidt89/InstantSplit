import { useTranslation } from "react-i18next";

import styles from "./LegalNoticePage.module.css";
import { getPreviousRoute } from "../../utils/localStorage";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import LegalNoticeAuthor from "../../components/LegalNotice/LegalNoticeAuthor/LegalNoticeAuthor";
import {
  authorInfo,
  legalNoticeSections,
} from "../../contents/legalNoticeContent";
import LegalNoticeSections from "../../components/LegalNotice/LegalNoticeSections/LegalNoticeSections";

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
      <PiratePx COUNT_IDENTIFIER='legal-notice' />

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
