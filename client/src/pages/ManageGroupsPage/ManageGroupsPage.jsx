import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import styles from "./ManageGroupsPage.module.css";
import { setPreviousRoute } from "../../utils/localStorage";
import useSyncStoredGroupCodes from "../../hooks/useSyncStoredGroupCodes";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import SwitchGroups from "../../components/ManageGroups/SwitchGroups/SwitchGroups/SwitchGroups";
import CreateGroupForm from "../../components/ManageGroups/CreateGroupForm/CreateGroupForm";
import ValidateGroupCode from "../../components/ManageGroups/ValidateGroupCode/ValidateGroupCode";
import { useGroupContext } from "../../context/GroupContext.jsx";

const ManageGroupsPage = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const { activeGroupCode } = useGroupContext();

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

        <SwitchGroups groupCode={activeGroupCode} />

        <CreateGroupForm isExistingUser={true} />

        <ValidateGroupCode isExistingUser={true} />
      </div>
    </main>
  );
};

export default ManageGroupsPage;
