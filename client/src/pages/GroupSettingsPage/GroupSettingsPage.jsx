import { useTranslation } from "react-i18next";

import { getActiveGroupCode } from "@client-utils/localStorageUtils";

import useFetchGroupData from "@hooks/useFetchGroupData";
import useSettingsEmoji from "@hooks/useSettingsEmoji";

import HelmetMetaTagsNetlify from "@components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "@components/PiratePx/PiratePx";
import Emoji from "@components/Emoji/Emoji";
import InAppNavigationBar from "@components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Spinner from "@components/Spinner/Spinner";
import ChangeGroupCurrency from "@components/GroupSettings/ChangeGroupCurrency/ChangeGroupCurrency";
import ChangeDataPurgeSetting from "@components/GroupSettings/ChangeDataPurgeSetting/ChangeDataPurgeSetting";
import GroupCodeSecurity from "@components/GroupSettings/GroupCodeSecurity/GroupCodeSecurity";
import ChangeGroupName from "@components/GroupSettings/ChangeGroupName/ChangeGroupName";

import styles from "./GroupSettingsPage.module.css";

const GroupSettingsPage = () => {
  const { t } = useTranslation();
  const settingsEmoji = useSettingsEmoji();

  const groupCode = getActiveGroupCode();

  const { groupData, isFetched } = useFetchGroupData(groupCode);

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

        {!isFetched && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}

        {isFetched && groupData && (
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
        )}
      </div>
    </main>
  );
};

export default GroupSettingsPage;
