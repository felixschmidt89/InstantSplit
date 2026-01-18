import React from "react";
import { useTranslation } from "react-i18next";
import { devLog } from "../../utils/errorUtils";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ChangeGroupCurrency from "../../components/features/GroupSettings/ChangeGroupCurrency/ChangeGroupCurrency";
import ChangeDataPurgeSetting from "../../components/features/GroupSettings/ChangeDataPurgeSetting/ChangeDataPurgeSetting";
import Spinner from "../../components/common/Spinner/Spinner";
import GroupCodeSecurity from "../../components/features/GroupSettings/GroupCodeSecurity/GroupCodeSecurity";
import { ROUTES } from "../../constants/routesConstants";
import styles from "./OnboardingGroupSettingsPage.module.css";

const OnboardingGroupSettingsPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  const { t } = useTranslation();

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
        {!isFetched ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          groupData && (
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
          )
        )}
      </div>
    </main>
  );
};

export default OnboardingGroupSettingsPage;
