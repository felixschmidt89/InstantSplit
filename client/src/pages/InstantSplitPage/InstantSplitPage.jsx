import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePWAInstall } from "react-use-pwa-install";
import { useTranslation } from "react-i18next";

import { shouldShowPwaPrompt as showPwaPrompt } from "@client-utils/user";
import { devLog } from "@client-utils/errorUtils";
import {
  deleteNestedPreviousRoute,
  deletePreviousRoute,
  getActiveGroupCode,
  getStoredView,
  setStoredView,
  deleteGroupCode,
} from "@client-utils/localStorage";

import { LEGACY_VIEW_TYPES, VIEW_TYPES } from "@client-constants/viewConstants";
import { ROUTES } from "@client-constants/routesConstants";

import useFetchGroupData from "@hooks/useFetchGroupData";
import useValidateGroupExistence from "@hooks/useValidateGroupCodeExistence";
import useGetClientDeviceAndPwaInfo from "@hooks/useGetClientDeviceAndPwaInfo";

import HelmetMetaTagsNetlify from "@components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import SwitchViewButtonsBar from "@components/GroupBalancesAndHistory/SwitchViewButtonsBar/SwitchViewButtonsBar";
import RenderGroupHistory from "@components/GroupBalancesAndHistory/GroupHistory/RenderGroupHistory/RenderGroupHistory";
import RenderGroupBalances from "@components/GroupBalancesAndHistory/GroupBalances/RenderGroupBalances/RenderGroupBalances";
import DefaultAndUserSettingsBar from "@components/DefaultAndUserSettingsBar/DefaultAndUserSettingsBar";
import PwaCtaModal from "@components/PwaCtaModal/PwaCtaModal/PwaCtaModal";
import ActiveGroupBar from "@components/ActiveGroupBar/ActiveGroupBar";

import styles from "./InstantSplitPage.module.css";

const InstantSplitPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isPWAInstallPromptAvailable = usePWAInstall();

  const groupCode = getActiveGroupCode();

  const [view, setView] = useState(
    () => getStoredView() || VIEW_TYPES.BALANCES,
  );
  const [ctaToRender, setCtaToRender] = useState(null);
  const [showPwaCtaModal, setShowPwaCtaModal] = useState(null);

  const { isValidated, groupExists } = useValidateGroupExistence(
    groupCode,
    "continuous",
  );
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  const { isPwa, isMobile, isMobileSafari, isAndroid, isIOS, browserName } =
    useGetClientDeviceAndPwaInfo();

  const canShowPwaPrompt = showPwaPrompt();

  const updateView = (newView) => {
    if (setStoredView(newView)) {
      setView(newView);
    }
  };

  useEffect(() => {
    deletePreviousRoute();
    deleteNestedPreviousRoute();
  }, []);

  useEffect(() => {
    if (!groupCode) {
      navigate(ROUTES.HOME);
    }
  }, [groupCode, navigate]);

  useEffect(() => {
    if (isValidated && !groupExists) {
      deleteGroupCode(groupCode);
      navigate(ROUTES.HOME);
    }
  }, [navigate, groupCode, isValidated, groupExists]);

  useEffect(() => {
    const lowercaseBrowserName = browserName?.toLowerCase() || "";

    if (
      isIOS &&
      isMobileSafari &&
      lowercaseBrowserName.includes("safari") &&
      !isPwa &&
      isMobile
    ) {
      setCtaToRender("iPadIPhone");
    } else if (!isPwa && isPWAInstallPromptAvailable) {
      setCtaToRender("pwaInstallPrompt");
    } else if (isMobile && isAndroid && !isPwa) {
      if (lowercaseBrowserName.includes("firefox")) {
        setCtaToRender("firefox");
      } else if (lowercaseBrowserName.includes("samsung")) {
        setCtaToRender("samsung");
      } else if (lowercaseBrowserName.includes("opera")) {
        setCtaToRender("opera");
      } else {
        setCtaToRender(null);
      }
    } else {
      devLog("Client does not match PWA CTA rendering conditions.");
    }
  }, [
    isIOS,
    isMobileSafari,
    browserName,
    isAndroid,
    isPwa,
    isMobile,
    isPWAInstallPromptAvailable,
  ]);

  useEffect(() => {
    setShowPwaCtaModal(!!(!isPwa && ctaToRender && canShowPwaPrompt));
  }, [isPwa, ctaToRender, canShowPwaPrompt]);

  return (
    <main className={styles.mainContainer}>
      {!isFetched ? (
        <span className={styles.spinner}></span>
      ) : (
        <>
          {groupData?.group && (
            <>
              <HelmetMetaTagsNetlify title={t("main-page-title")} />

              <DefaultAndUserSettingsBar />

              <div className={styles.topBar}>
                <h1>{groupData.group.groupName}</h1>
              </div>

              <SwitchViewButtonsBar view={view} updateView={updateView} />

              {view === VIEW_TYPES.HISTORY ||
              view === LEGACY_VIEW_TYPES.VIEW_1 ? (
                <RenderGroupHistory
                  groupCode={groupCode}
                  groupCurrency={groupData.group.currency}
                />
              ) : (
                <RenderGroupBalances groupCurrency={groupData.group.currency} />
              )}
            </>
          )}

          <ActiveGroupBar />

          {showPwaCtaModal && (
            <PwaCtaModal
              ctaToRender={ctaToRender}
              setShowPwaCtaModal={setShowPwaCtaModal}
            />
          )}
        </>
      )}
    </main>
  );
};

export default InstantSplitPage;
