import { useTranslation } from "react-i18next";

import useFetchGroupData from "@hooks/useFetchGroupData";

import HelmetMetaTagsNetlify from "@components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "@components/PiratePx/PiratePx";
import InAppNavigationBar from "@components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ChangeGroupCurrency from "@components/GroupSettings/ChangeGroupCurrency/ChangeGroupCurrency";
import ChangeDataPurgeSetting from "@components/GroupSettings/ChangeDataPurgeSetting/ChangeDataPurgeSetting";
import GroupCodeSecurity from "@components/GroupSettings/GroupCodeSecurity/GroupCodeSecurity";
import Spinner from "@components/Spinner/Spinner";

import { ROUTES } from "@client-constants/routesConstants";

import styles from "./OnboardingGroupSettingsPage.module.css";
import { getActiveGroupCode } from "@/utils/localStorage/index.js";

const OnboardingGroupSettingsPage = () => {
  const { t } = useTranslation();

  const groupCode = getActiveGroupCode();

  const { groupData, isFetched } = useFetchGroupData(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={t("onboarding-group-settings-page-title")}
      />
      <PiratePx COUNT_IDENTIFIER='onboarding-group-settings' />
      <InAppNavigationBar
        back
        backRoute={ROUTES.MEMBERS.CREATE}
        forward
        forwardRoute={ROUTES.INSTANT_SPLIT}
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
              groupCode={groupCode}
              groupCurrency={groupData.group.currency}
              isOnboarding
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

export default OnboardingGroupSettingsPage;
