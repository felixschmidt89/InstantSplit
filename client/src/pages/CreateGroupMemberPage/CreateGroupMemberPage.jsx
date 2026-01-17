import React from "react";
import { useTranslation } from "react-i18next";
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";
import useTriggerRerender from "../../hooks/useTriggerRerender";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CreateGroupMemberForm from "../../components/features/CreateGroupMember/CreateGroupMemberForm/CreateGroupMemberForm";
import RenderGroupMemberNames from "../../components/features/CreateGroupMember/RenderGroupMemberNames/RenderGroupMemberNames";
import { ROUTES } from "../../constants/routesConstants";
import styles from "./CreateGroupMemberPage.module.css";

const CreateGroupMemberPage = () => {
  const { previousRoute, isRetrieved } = useGetPreviousRoutesFromLocalStorage();
  const { t } = useTranslation();

  // CODECHANGE: Replaced hardcoded strings with ROUTES constants
  const isNewUser =
    previousRoute && isRetrieved
      ? previousRoute.includes(ROUTES.ONBOARDING.CREATE_GROUP)
      : false;

  const isInAppGroupCreation =
    previousRoute && isRetrieved
      ? previousRoute.includes(ROUTES.MANAGE_GROUPS)
      : false;

  const previousRouteExists = localStorage.getItem("previousRoute");
  const isRegularUser = !previousRouteExists;

  const { groupCode, rerenderTrigger, incrementRerenderTrigger } =
    useTriggerRerender();

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
