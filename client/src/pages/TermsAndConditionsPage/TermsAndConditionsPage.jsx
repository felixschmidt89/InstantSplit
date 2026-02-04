import { useTranslation } from "react-i18next";

import styles from "./TermsAndConditionsPage.module.css";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions/TermsAndConditions";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import { getPreviousRoute } from "../../utils/localStorage";

const TermsAndConditionsPage = () => {
  const { t } = useTranslation();

  const previousRoute = getPreviousRoute();

  // TODO: Do not hardcode route strings
  const isInvitedUser = previousRoute?.includes("join-instantsplit-group/");

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("terms-and-conditions-page-title")} />

      <InAppNavigationBar previousRoute={isInvitedUser} back={!isInvitedUser} />

      <div className={styles.container}>
        <TermsAndConditions />
      </div>
    </main>
  );
};

export default TermsAndConditionsPage;
