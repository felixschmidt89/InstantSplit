import { useTranslation } from "react-i18next";

import styles from "./LegalNoticePage.module.css";
import useUserOrigin from "../../hooks/useUserOrigin.jsx";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify.jsx";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar.jsx";
import LegalNoticeAuthor from "../../components/LegalNotice/LegalNoticeAuthor/LegalNoticeAuthor.jsx";
import LegalNoticeSections from "../../components/LegalNotice/LegalNoticeSections/LegalNoticeSections.jsx";

const LegalNoticePage = () => {
  const { t } = useTranslation();

  const { isFromInvitation } = useUserOrigin();

  const shouldShowPreviousRoute = isFromInvitation;
  const shouldShowBackButton = !isFromInvitation;

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={t("legal-notice-page-title")}
        description={t("legal-notice-page-description")}
      />

      <InAppNavigationBar
        previousRoute={shouldShowPreviousRoute}
        back={shouldShowBackButton}
      />

      <div className={styles.container}>
        <h1>{t("legal-notice-page-header")}</h1>
        <p className={styles.note}>{t("legal-notice-page-explanation")}</p>

        <LegalNoticeAuthor />
        <LegalNoticeSections />
      </div>
    </main>
  );
};

export default LegalNoticePage;
