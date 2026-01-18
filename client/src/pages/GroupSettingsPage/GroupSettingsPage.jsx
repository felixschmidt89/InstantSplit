// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";
import useSettingsEmoji from "../../hooks/useSettingsEmoji";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Emoji from "../../components/common/Emoji/Emoji";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Spinner from "../../components/common/Spinner/Spinner";
import ChangeGroupCurrency from "../../components/features/GroupSettings/ChangeGroupCurrency/ChangeGroupCurrency";
import ChangeDataPurgeSetting from "../../components/features/GroupSettings/ChangeDataPurgeSetting/ChangeDataPurgeSetting";
import GroupCodeSecurity from "../../components/features/GroupSettings/GroupCodeSecurity/GroupCodeSecurity";
import ChangeGroupName from "../../components/features/GroupSettings/ChangeGroupName/ChangeGroupName";

// Styles
import styles from "./GroupSettingsPage.module.css";

const GroupSettingsPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  const settingsEmoji = useSettingsEmoji();
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("group-settings-page-title")} />
      <PiratePx COUNT_IDENTIFIER='group-settings' />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>
          {t("group-settings-page-header")}
          <Emoji ariaLabel='settings emoji' emoji={settingsEmoji} />
        </h1>
        {isFetched && groupData ? (
          <div className={styles.settingsContainer}>
            <ChangeGroupName groupData={groupData} groupCode={groupCode} />
            <ChangeGroupCurrency
              groupCode={groupCode}
              groupCurrency={groupData.group.currency}
            />
            <ChangeDataPurgeSetting
              groupCode={groupCode}
              inactiveDataPurge={groupData.group.inactiveDataPurge}
            />
            <GroupCodeSecurity groupCode={groupCode} />
          </div>
        ) : (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
      </div>
    </main>
  );
};

export default GroupSettingsPage;
