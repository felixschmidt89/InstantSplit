import { useTranslation } from "react-i18next";

import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CreateGroupForm from "../../components/ManageGroups/CreateGroupForm/CreateGroupForm";

import { TO } from "../../constants/clientRouteLinks";

import styles from "./OnboardingCreateGroupPage.module.css";

const { HOME } = TO;

const OnboardingCreateGroupPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("onboarding-create-group-page-title")} />
      <InAppNavigationBar back={true} backTo={HOME} />
      <div className={styles.container}>
        <CreateGroupForm isExistingUser={false} />
      </div>
    </main>
  );
};

export default OnboardingCreateGroupPage;
