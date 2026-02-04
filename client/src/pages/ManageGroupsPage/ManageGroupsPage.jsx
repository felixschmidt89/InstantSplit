import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  setPreviousRoute,
  getActiveGroupCode,
} from "@client-utils/localStorage";

import HelmetMetaTagsNetlify from "@components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import CreateGroupForm from "@components/ManageGroups/CreateGroupForm/CreateGroupForm";
import SwitchGroups from "@components/ManageGroups/SwitchGroups/SwitchGroups/SwitchGroups";
import ValidateGroupCode from "@components/ManageGroups/ValidateGroupCode/ValidateGroupCode";
import InAppNavigationBar from "@components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

import styles from "./ManageGroupsPage.module.css";
import useSyncStoredGroupCodes from "@/hooks/useSyncStoredGroupCodes";

const ManageGroupsPage = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const groupCode = getActiveGroupCode();

  useSyncStoredGroupCodes();

  useEffect(() => {
    setPreviousRoute(pathname);
  }, [pathname]);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("manage-groups-page-title")} />
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
