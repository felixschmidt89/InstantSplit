import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { setRouteInLocalStorage } from "@client-utils/localStorageUtils";

import useValidateAndCleanupStoredGroupCodes from "@hooks/useValidateAndCleanUpStoredGroupCodes";

import PiratePx from "@components/PiratePx/PiratePx";
import HelmetMetaTagsNetlify from "@components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import CreateGroupForm from "@components/ManageGroups/CreateGroupForm/CreateGroupForm";
import SwitchGroups from "@components/ManageGroups/SwitchGroups/SwitchGroups/SwitchGroups";
import ValidateGroupCode from "@components/ManageGroups/ValidateGroupCode/ValidateGroupCode";
import InAppNavigationBar from "@components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

import styles from "./ManageGroupsPage.module.css";
import { getActiveGroupCode } from "@/utils/localStorage";

const ManageGroupsPage = () => {
  const { t } = useTranslation();

  const groupCode = getActiveGroupCode();

  useValidateAndCleanupStoredGroupCodes();

  useEffect(() => {
    setRouteInLocalStorage(window.location.pathname, "previousRoute");
  }, []);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("manage-groups-page-title")} />
      <PiratePx COUNT_IDENTIFIER='manage-groups' />
      <InAppNavigationBar back={true} />

      <div className={styles.container}>
        <h1>{t("manage-groups-page-header")}</h1>

        <SwitchGroups groupCode={groupCode} />

        <CreateGroupForm isExistingUser={true} />

        <ValidateGroupCode isExistingUser={true} />
      </div>
    </main>
  );
};

export default ManageGroupsPage;
