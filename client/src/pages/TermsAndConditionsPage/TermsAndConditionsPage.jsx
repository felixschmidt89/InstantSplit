import { useTranslation } from "react-i18next";

import styles from "./TermsAndConditionsPage.module.css";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions/TermsAndConditions";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import useUserOrigin from "../../hooks/useUserOrigin"; // Import the new hook

const TermsAndConditionsPage = () => {
  const { t } = useTranslation();

  const { isInvitedUser, isOriginChecked } = useUserOrigin();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("terms-and-conditions-page-title")} />

      {isOriginChecked && (
        <InAppNavigationBar
          previousRoute={isInvitedUser}
          back={!isInvitedUser}
        />
      )}

      <div className={styles.container}>
        <TermsAndConditions />
      </div>
    </main>
  );
};

export default TermsAndConditionsPage;
