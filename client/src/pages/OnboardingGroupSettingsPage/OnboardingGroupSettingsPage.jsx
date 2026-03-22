import { useTranslation } from "react-i18next";

import styles from "./OnboardingGroupSettingsPage.module.css";
import { useGroupContext } from "../../context/GroupContext.jsx";
import useFetchGroupData from "../../hooks/useFetchGroupData.jsx";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify.jsx";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar.jsx";
import CLIENT_STATIC_ROUTES from "../../constants/clientStaticRoutesConstants.js";
import TO from "../../constants/clientRouteLinks.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import ChangeGroupCurrency from "../../components/GroupSettings/ChangeGroupCurrency/ChangeGroupCurrency.jsx";
import ChangeDataPurgeSetting from "../../components/GroupSettings/ChangeDataPurgeSetting/ChangeDataPurgeSetting.jsx";
import GroupCodeSecurity from "../../components/GroupSettings/GroupCodeSecurity/GroupCodeSecurity.jsx";

const { CREATE_MEMBERS } = CLIENT_STATIC_ROUTES;
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
        backTo={CREATE_MEMBERS}
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
