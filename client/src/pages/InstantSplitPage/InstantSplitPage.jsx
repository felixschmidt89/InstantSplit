// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePWAInstall } from "react-use-pwa-install";
import { useTranslation } from "react-i18next";

// Constants and Utils
import {
  deleteGroupDataFromLocalStorage,
  setViewStateInLocalStorage,
} from "../../utils/localStorageUtils";
import { checkModalClosureUserActionExpiration } from "../../utils/clientUtils";
import { devLog } from "../../utils/errorUtils";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";
import useDeletePreviousRouteFromLocalStorage from "../../hooks/useDeletePreviousRouteFromLocalStorage";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import useGetClientDeviceAndPwaInfo from "../../hooks/useGetClientDeviceAndPwaInfo";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import ActiveGroupBar from "../../components/features/ActiveGroupBar/ActiveGroupBar";
import SwitchViewButtonsBar from "../../components/features/GroupBalancesAndHistory/SwitchViewButtonsBar/SwitchViewButtonsBar";
import RenderGroupHistory from "../../components/features/GroupBalancesAndHistory/GroupHistory/RenderGroupHistory/RenderGroupHistory";
import RenderGroupBalances from "../../components/features/GroupBalancesAndHistory/GroupBalances/RenderGroupBalances/RenderGroupBalances";
import DefaultAndUserSettingsBar from "../../components/DefaultAndUserSettingsBar/DefaultAndUserSettingsBar/DefaultAndUserSettingsBar";
import PwaCtaModal from "../../components/features/PwaCtaModal/PwaCtaModal/PwaCtaModal";

// Styles
import styles from "./InstantSplitPage.module.css";

/**
 * Renders the main screen of the application
 * @returns {JSX.Element} InstantSplitPage component.
 */
const InstantSplitPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const groupCode = localStorage.getItem("activeGroupCode");
  const initialViewState = localStorage.getItem("viewState") || "view2";
  const [view, setView] = useState(initialViewState);

  // Handle no active groupCode
  useEffect(() => {
    if (!groupCode) {
      navigate("/");
    }
  }, [groupCode, navigate]);

  // Validate active groupCode
  const { isValidated, groupExists } = useValidateGroupExistence(
    groupCode,
    "continuous",
  );

  // Handle invalid active groupCode
  useEffect(() => {
    if (isValidated && !groupExists) {
      deleteGroupDataFromLocalStorage(groupCode);
      navigate("/");
    }
  }, [navigate, groupCode, isValidated, groupExists]);

  // Clear nested routes
  useDeletePreviousRouteFromLocalStorage();
  useDeletePreviousRouteFromLocalStorage("nestedPreviousRoute");

  const { groupData, isFetched } = useFetchGroupData(groupCode);

  const updateView = (newView) => {
    try {
      setViewStateInLocalStorage(newView);
      setView(newView);
    } catch (error) {
      devLog(`Error setting viewState to ${newView} in local storage.`, error);
    }
  };

  // use library to check if PWA install prompt is available
  const isPWAInstallPromptAvailable = usePWAInstall();
  devLog("isPWAInstallPromptAvailable", isPWAInstallPromptAvailable);
  // Get client device and PWA info and manage CTA based on that
  const { isPwa, isMobile, isMobileSafari, isAndroid, isIOS, browserName } =
    useGetClientDeviceAndPwaInfo();
  const [ctaToRender, setCtaToRender] = useState(null);

  // Render PWA CTA on iPhone and iPad when app is accessed in Safari
  useEffect(() => {
    const lowercaseBrowserName = browserName.toLowerCase();

    if (
      isIOS &&
      isMobileSafari &&
      lowercaseBrowserName.includes("safari") &&
      !isPwa &&
      isMobile
    ) {
      setCtaToRender("iPadIPhone");
      // Render PWA installation CTA if available
    } else if (!isPwa && isPWAInstallPromptAvailable) {
      setCtaToRender("pwaInstallPrompt");
    } else if (isMobile && isAndroid && !isPwa) {
      // Render PWA instruction CTA on Android devices
      if (lowercaseBrowserName.includes("firefox")) {
        setCtaToRender("firefox");
      } else if (lowercaseBrowserName.includes("samsung")) {
        setCtaToRender("samsung");
      } else if (lowercaseBrowserName.includes("opera")) {
        setCtaToRender("opera");
      } else {
        // Render nothing
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

  // If pwa install prompt is available OR client is supported AND last modal closure user action has expired, show PWA CTA modal
  const [showPwaCtaModal, setShowPwaCtaModal] = useState(null);
  const lastModalClosureUserActionHasExpired =
    checkModalClosureUserActionExpiration();

  useEffect(() => {
    setShowPwaCtaModal(
      !isPwa && ctaToRender !== null && lastModalClosureUserActionHasExpired,
    );
  }, [isPwa, ctaToRender, lastModalClosureUserActionHasExpired]);

  return (
    <main>
      {!isFetched ? (
        <span className={styles.spinner}></span>
      ) : groupData.group ? (
        <>
          <HelmetMetaTagsNetlify title={t("main-page-title")} />
          <PiratePx COUNT_IDENTIFIER={"main-application"} />
          <DefaultAndUserSettingsBar />
          <div className={styles.topBar}>
            <h1>{groupData.group.groupName}</h1>
          </div>
          <SwitchViewButtonsBar view={view} updateView={updateView} />
          {view === "view1" ? (
            <RenderGroupHistory
              groupCode={groupCode}
              groupCurrency={groupData.group.currency}
            />
          ) : (
            <RenderGroupBalances groupCurrency={groupData.group.currency} />
          )}
          <ActiveGroupBar />
          {showPwaCtaModal && (
            <PwaCtaModal
              ctaToRender={ctaToRender}
              setShowPwaCtaModal={setShowPwaCtaModal}
            />
          )}
        </>
      ) : null}
    </main>
  );
};

export default InstantSplitPage;
