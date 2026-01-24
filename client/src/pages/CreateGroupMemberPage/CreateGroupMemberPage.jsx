import { useTranslation } from "react-i18next";

import { ROUTES } from "@client-constants/routesConstants";
import { getPreviousRoute } from "@client-utils/localStorage";
import useTriggerRerender from "@hooks/useTriggerRerender";

import HelmetMetaTagsNetlify from "@components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "@components/PiratePx/PiratePx";
import InAppNavigationBar from "@components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CreateGroupMemberForm from "@components/CreateGroupMember/CreateGroupMemberForm/CreateGroupMemberForm";
import RenderGroupMemberNames from "@components/CreateGroupMember/RenderGroupMemberNames/RenderGroupMemberNames";

import styles from "./CreateGroupMemberPage.module.css";

const CreateGroupMemberPage = () => {
  const { t } = useTranslation();
  const { groupCode, rerenderTrigger, incrementRerenderTrigger } =
    useTriggerRerender();

  const previousRoute = getPreviousRoute();

  const isNewUser = !!previousRoute?.includes(ROUTES.ONBOARDING.CREATE_GROUP);
  const isInAppGroupCreation = !!previousRoute?.includes(ROUTES.MANAGE_GROUPS);
  const isRegularUser = !previousRoute;

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-group-members-page-title")} />
      <PiratePx COUNT_IDENTIFIER='create-group-members' />

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
