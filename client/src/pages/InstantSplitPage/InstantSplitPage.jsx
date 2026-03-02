import { useEffect, useState } from "react";
import { usePWAInstall } from "react-use-pwa-install";
import { useTranslation } from "react-i18next";

import styles from "./InstantSplitPage.module.css";
import { useGroupContext } from "../../context/GroupContext";
import {
  deleteGroupCodeFromLocalStorage,
  deleteNestedPreviousRouteFromLocalStorage,
  deletePreviousRouteFromLocalStorage,
  getStoredViewFromLocalStorage,
  setStoredViewInLocalStorage,
} from "../../utils/localStorage";
import { LEGACY_VIEW_TYPES, VIEW_TYPES } from "../../constants/viewConstants";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import useGetClientDeviceAndPwaInfo from "../../hooks/useGetClientDeviceAndPwaInfo";
import { shouldShowPwaPrompt } from "../../utils/user";
import { TO } from "../../constants/navigationConstants";
import { devLog } from "../../utils/errorUtils";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import DefaultAndUserSettingsBar from "../../components/DefaultAndUserSettingsBar/DefaultAndUserSettingsBar";
import SwitchViewButtonsBar from "../../components/GroupBalancesAndHistory/SwitchViewButtonsBar/SwitchViewButtonsBar";
import RenderGroupHistory from "../../components/GroupBalancesAndHistory/GroupHistory/GroupHistory/GroupHistory";
import RenderGroupBalances from "../../components/GroupBalancesAndHistory/GroupBalances/RenderGroupBalances/RenderGroupBalances";
import ActiveGroupBar from "../../components/ActiveGroupBar/ActiveGroupBar";
import PwaCtaModal from "../../components/PwaCtaModal/PwaCtaModal/PwaCtaModal";
import { useNavigate } from "react-router-dom";

const { HOME } = TO;

const InstantSplitPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isPWAInstallPromptAvailable = usePWAInstall();

  const { activeGroupCode } = useGroupContext();

  const [view, setView] = useState(
    () => getStoredViewFromLocalStorage() || VIEW_TYPES.BALANCES,
  );
  const [ctaToRender, setCtaToRender] = useState(null);
  const [showPwaCtaModal, setShowPwaCtaModal] = useState(null);

  const { isValidated, groupExists } = useValidateGroupExistence(
    activeGroupCode,
    "continuous",
  );
  const { groupData, isFetched } = useFetchGroupData(activeGroupCode);
  const { isPwa, isMobile, isMobileSafari, isAndroid, isIOS, browserName } =
    useGetClientDeviceAndPwaInfo();

  const canShowPwaPrompt = shouldShowPwaPrompt();

  const updateView = (newView) => {
    if (setStoredViewInLocalStorage(newView)) {
      setView(newView);
    }
  };

  useEffect(() => {
    deletePreviousRouteFromLocalStorage();
    deleteNestedPreviousRouteFromLocalStorage();
  }, []);

  useEffect(() => {
    if (!activeGroupCode) {
      navigate(HOME);
    }
  }, [activeGroupCode, navigate]);

  useEffect(() => {
    if (isValidated && !groupExists) {
      deleteGroupCodeFromLocalStorage(activeGroupCode);
      navigate(HOME);
    }
  }, [navigate, activeGroupCode, isValidated, groupExists]);

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
    setShowPwaCtaModal(Boolean(!isPwa && ctaToRender && canShowPwaPrompt));
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
                  groupCode={activeGroupCode}
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
