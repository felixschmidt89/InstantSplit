import { useTranslation } from "react-i18next";

import styles from "./GroupSettingsPage.module.css";
import useSettingsEmoji from "../../hooks/useSettingsEmoji";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Emoji from "../../components/Emoji/Emoji";
import Spinner from "../../components/Spinner/Spinner";
import ChangeGroupName from "../../components/GroupSettings/ChangeGroupName/ChangeGroupName";
import ChangeGroupCurrency from "../../components/GroupSettings/ChangeGroupCurrency/ChangeGroupCurrency";
import ChangeDataPurgeSetting from "../../components/GroupSettings/ChangeDataPurgeSetting/ChangeDataPurgeSetting";
import GroupCodeSecurity from "../../components/GroupSettings/GroupCodeSecurity/GroupCodeSecurity";
import { useGroupContext } from "../../context/GroupContext.jsx";

const GroupSettingsPage = () => {
  const { t } = useTranslation();
  const settingsEmoji = useSettingsEmoji();

  const { activeGroupCode } = useGroupContext();

  const { groupData, isFetched } = useFetchGroupData(activeGroupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("group-settings-page-title")} />
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
            {/* Pass activeGroupCode down to children */}
            <ChangeGroupName
              groupData={groupData}
              groupCode={activeGroupCode}
            />

            <ChangeGroupCurrency
              groupCode={activeGroupCode}
              groupCurrency={groupData.group.currency}
            />

            <ChangeDataPurgeSetting
              groupCode={activeGroupCode}
              inactiveDataPurge={groupData.group.inactiveDataPurge}
            />

            <GroupCodeSecurity groupCode={activeGroupCode} />
          </div>
        )}
      </div>
    </main>
  );
};

export default GroupSettingsPage;
