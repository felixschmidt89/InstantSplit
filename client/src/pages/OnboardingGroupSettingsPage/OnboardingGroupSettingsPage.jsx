import { useTranslation } from "react-i18next";

import styles from "./OnboardingGroupSettingsPage.module.css";
import { useGroupContext } from "../../context/GroupContext";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import { CLIENT_ROUTES } from "../../constants/clientRoutesConstants";
import { TO } from "../../constants/navigationConstants";
import Spinner from "../../components/Spinner/Spinner";
import ChangeGroupCurrency from "../../components/GroupSettings/ChangeGroupCurrency/ChangeGroupCurrency";
import ChangeDataPurgeSetting from "../../components/GroupSettings/ChangeDataPurgeSetting/ChangeDataPurgeSetting";
import GroupCodeSecurity from "../../components/GroupSettings/GroupCodeSecurity/GroupCodeSecurity";

const { MEMBERS } = CLIENT_ROUTES;
const { INSTANT_SPLIT } = TO;

const OnboardingGroupSettingsPage = () => {
  const { t } = useTranslation();
  const { activeGroupCode } = useGroupContext();

  const { groupData, isFetched } = useFetchGroupData(activeGroupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={t("onboarding-group-settings-page-title")}
      />
      <InAppNavigationBar
        back
        backTo={MEMBERS.CREATE}
        forward
        forwardTo={INSTANT_SPLIT}
      />

      <div className={styles.container}>
        {!isFetched && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}

        {isFetched && groupData && (
          <div className={styles.settings}>
            <ChangeGroupCurrency
              groupCode={activeGroupCode}
              groupCurrency={groupData.group.currency}
              isOnboarding
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

export default OnboardingGroupSettingsPage;
