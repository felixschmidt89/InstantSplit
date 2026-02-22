import { useTranslation } from "react-i18next";

import styles from "./LegalNoticePage.module.css";
import { getPreviousRoute } from "../../utils/localStorage";
import { ROUTES } from "../../constants/routesConstants";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import LegalNoticeAuthor from "../../components/LegalNotice/LegalNoticeAuthor/LegalNoticeAuthor";
import LegalNoticeSections from "../../components/LegalNotice/LegalNoticeSections/LegalNoticeSections";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";

const LegalNoticePage = () => {
  const { t } = useTranslation();

  const previousRoute = getPreviousRoute();

  const isInvitedUser = Boolean(
    previousRoute?.includes(ROUTES.JOIN_GROUP.DE) ||
    previousRoute?.includes(ROUTES.JOIN_GROUP.EN),
  );

  debugLog(
    "LegalNoticePage: user check",
    {
      isInvitedUser,
      ...(isInvitedUser && { sourceRoute: previousRoute }),
    },
    LOG_LEVELS.DEBUG,
  );

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={t("legal-notice-page-title")}
        description={t("legal-notice-page-description")}
      />

      <InAppNavigationBar previousRoute={isInvitedUser} back={!isInvitedUser} />

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
