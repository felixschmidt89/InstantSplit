import { useTranslation } from "react-i18next";

import styles from "./CreateGroupMemberPage.module.css";
import { getPreviousRoute } from "../../utils/localStorage";
import { CLIENT_ROUTES } from "../../constants/clientRoutesConstants.js";
import { TO } from "../../constants/navigationConstants";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CreateGroupMemberForm from "../../components/CreateGroupMember/CreateGroupMemberForm/CreateGroupMemberForm";
import RenderGroupMemberNames from "../../components/CreateGroupMember/GroupMemberNames/GroupMemberNames.jsx";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { ONBOARDING, MANAGE_GROUPS } = CLIENT_ROUTES;
const { HOME } = TO;

const CreateGroupMemberPage = () => {
  const { t } = useTranslation();
  const previousRoute = getPreviousRoute();

  debugLog("Current previousRoute in Page:", previousRoute);

  const isNewUser = Boolean(previousRoute?.includes(ONBOARDING.CREATE_GROUP));
  const isInAppGroupCreation = Boolean(previousRoute?.includes(MANAGE_GROUPS));
  const isRegularUser = !previousRoute;

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-group-members-page-title")} />

      <InAppNavigationBar
        abort={isNewUser || isInAppGroupCreation}
        abortTo={isInAppGroupCreation ? MANAGE_GROUPS : HOME}
        back={isRegularUser}
        forward={isNewUser || isInAppGroupCreation}
        forwardTo={ONBOARDING.GROUP_SETTINGS}
      />

      <div className={styles.addGroupMember}>
        {!isNewUser && <h1>{t("create-group-members-page-header")}</h1>}
        <h2>{t("create-group-members-form-header")}</h2>

        <CreateGroupMemberForm />
      </div>

      <div className={styles.container}>
        <RenderGroupMemberNames isInAppGroupCreation={isInAppGroupCreation} />
      </div>
    </main>
  );
};

export default CreateGroupMemberPage;
