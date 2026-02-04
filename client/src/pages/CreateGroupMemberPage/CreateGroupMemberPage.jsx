import { useTranslation } from "react-i18next";

import styles from "./CreateGroupMemberPage.module.css";
import useTriggerRerender from "../../hooks/useTriggerRerender";
import { getPreviousRoute } from "../../utils/localStorage";
import { ROUTES } from "../../constants/routesConstants";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CreateGroupMemberForm from "../../components/CreateGroupMember/CreateGroupMemberForm/CreateGroupMemberForm";
import RenderGroupMemberNames from "../../components/CreateGroupMember/RenderGroupMemberNames/RenderGroupMemberNames";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const CreateGroupMemberPage = () => {
  const { t } = useTranslation();
  const { groupCode, rerenderTrigger, incrementRerenderTrigger } =
    useTriggerRerender();

  const previousRoute = getPreviousRoute();

  debugLog("Current previousRoute in Page:", previousRoute);

  const isNewUser = !!previousRoute?.includes(ROUTES.ONBOARDING.CREATE_GROUP);
  const isInAppGroupCreation = !!previousRoute?.includes(ROUTES.MANAGE_GROUPS);
  const isRegularUser = !previousRoute;

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-group-members-page-title")} />

      <InAppNavigationBar
        abort={isNewUser || isInAppGroupCreation}
        abortRoute={isInAppGroupCreation ? ROUTES.MANAGE_GROUPS : ROUTES.HOME}
        back={isRegularUser}
        forward={isNewUser || isInAppGroupCreation}
        forwardRoute={ROUTES.ONBOARDING.GROUP_SETTINGS}
      />

      <div className={styles.addGroupMember}>
        {!isNewUser && <h1>{t("create-group-members-page-header")}</h1>}
        <h2>{t("create-group-members-form-header")}</h2>

        <CreateGroupMemberForm
          incrementRerenderTrigger={incrementRerenderTrigger}
          groupCode={groupCode}
        />
      </div>

      <div className={styles.container}>
        <RenderGroupMemberNames
          rerenderTrigger={rerenderTrigger}
          groupCode={groupCode}
          incrementRerenderTrigger={incrementRerenderTrigger}
          isInAppGroupCreation={isInAppGroupCreation}
        />
      </div>
    </main>
  );
};

export default CreateGroupMemberPage;
