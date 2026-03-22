import { useTranslation } from "react-i18next";

import styles from "./CreateGroupMemberPage.module.css";
import useUserOrigin from "../../hooks/useUserOrigin.jsx";
import CLIENT_STATIC_ROUTES from "../../constants/clientStaticRoutesConstants.js";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify.jsx";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar.jsx";
import CreateGroupMemberForm from "../../components/CreateGroupMember/CreateGroupMemberForm/CreateGroupMemberForm.jsx";
import RenderGroupMemberNames from "../../components/CreateGroupMember/GroupMemberNames/GroupMemberNames.jsx";

const { ONBOARDING_GROUP_SETTINGS, MANAGE_GROUPS, HOME } = CLIENT_STATIC_ROUTES;

const CreateGroupMemberPage = () => {
  const { t } = useTranslation();

  const { isNewUser, isFromGroupManagement, isFromInstantSplit } =
    useUserOrigin();

  const isAbortEnabled = Boolean(isNewUser || isFromGroupManagement);
  const isBackEnabled = isFromInstantSplit;
  const isForwardEnabled = Boolean(isNewUser || isFromGroupManagement);
  const isHeaderVisible = !isNewUser;

  const abortDestination = isFromGroupManagement ? MANAGE_GROUPS : HOME;
  const forwardDestination = ONBOARDING_GROUP_SETTINGS;

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-group-members-page-title")} />

      <InAppNavigationBar
        abort={isAbortEnabled}
        abortTo={abortDestination}
        back={isBackEnabled}
        forward={isForwardEnabled}
        forwardTo={forwardDestination}
      />

      <div className={styles.addGroupMember}>
        {isHeaderVisible && <h1>{t("create-group-members-page-header")}</h1>}
        <h2>{t("create-group-members-form-header")}</h2>

        <CreateGroupMemberForm />
      </div>

      <div className={styles.container}>
        <RenderGroupMemberNames isInAppGroupCreation={isFromGroupManagement} />
      </div>
    </main>
  );
};

export default CreateGroupMemberPage;
