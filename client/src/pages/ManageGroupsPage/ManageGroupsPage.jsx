// React and Third-Party Libraries
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Hooks
import { setRouteInLocalStorage } from "../../utils/localStorageUtils";
import useValidateAndCleanupStoredGroupCodes from "../../hooks/useValidateAndCleanUpStoredGroupCodes";

// Components
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import PiratePx from "../../components/PiratePx/PiratePx";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import CreateGroupForm from "../../components/ManageGroups/CreateGroup/CreateGroupForm/CreateGroupForm";
import SwitchGroups from "../../components/ManageGroups/SwitchGroups/SwitchGroups/SwitchGroups";
import ValidateGroupCode from "../../components/ManageGroups/ValidateGroupCode/ValidateGroupCode";

// Styles
import styles from "./ManageGroupsPage.module.css";

const ManageGroupsPage = () => {
  const { t } = useTranslation();
  const groupCode = localStorage.getItem("activeGroupCode");
  useValidateAndCleanupStoredGroupCodes();

  // Set previousRoute for nested navigation
  useEffect(() => {
    setRouteInLocalStorage(window.location.pathname, "previousRoute");
  }, []);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("manage-groups-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"manage-groups"} />
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
