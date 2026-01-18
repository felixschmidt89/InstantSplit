import React, { useEffect, useRef, useState } from "react";
import { LuMenu } from "react-icons/lu";
import {
  IoInformationCircleOutline,
  IoEnterOutline,
  IoChatboxOutline,
  IoAddCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";

import { isWebShareAPISupported } from "../../../../utils/clientUtils";
import { addUserReactIconStyles } from "../../../../constants/stylesConstants";
import { ROUTES } from "../../../../constants/routesConstants";
import { dynamicRoutes } from "../../../../utils/dynamicRoutes";

import useFetchGroupData from "../../../../hooks/useFetchGroupData";
import useIsSlimDevice from "../../../../hooks/useIsSlimDevice";

import ReactIconNavigate from "../../../InAppNavigation/ReactIconNavigate/ReactIconNavigate";
import InstantSplitLogo from "../../../InstantSplitLogo/InstantSplitLogo";
import WebShareApiInvite from "../../ShareGroupInvitation/WebShareApiInvite/WebShareApiInvite";

import styles from "./DefaultAndUserSettingsBar.module.css";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const DefaultAndUserSettingsBar = () => {
  const containerRef = useRef(null);
  const { t, i18n } = useTranslation();
  const groupCode = localStorage.getItem("activeGroupCode");
  const supportsWebShareAPI = isWebShareAPISupported();
  const { isSlimDevice, isVerySlimDevice } = useIsSlimDevice();
  const [isDefaultBarShown, setIsDefaultBarShown] = useState(true);
  const { groupData, isFetched } = useFetchGroupData(groupCode);

  const showUserSettings = () => setIsDefaultBarShown(false);
  const hideUserSettings = () => setIsDefaultBarShown(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsDefaultBarShown(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isFetched && groupData?.group) {
      setIsDefaultBarShown(true);
    }
  }, [isFetched, groupData]);

  if (!isFetched) return <div />;

  const group = groupData?.group;
  const barClass = `${styles.userSettingsBar} ${
    isDefaultBarShown ? styles.showUserSettingsBar : styles.hideUserSettingsBar
  }`;

  const invitationLink = dynamicRoutes.join(
    encodeURIComponent(group?.initialGroupName || ""),
    groupCode,
    i18n.language,
  );
  const fullInvitationLink = `${baseUrl}${invitationLink}`;

  return (
    <div
      className={styles.container}
      role='toolbar'
      aria-label='top bar'
      ref={containerRef}>
      {!groupCode ? (
        <span className={styles.spinner} />
      ) : (
        <div className={styles.topBarWrapper}>
          {group && (
            <span
              className={barClass}
              role='toolbar'
              aria-label='user settings'>
              <span className={styles.icon}>
                {supportsWebShareAPI ? (
                  <WebShareApiInvite
                    groupName={group.groupName}
                    invitationLink={fullInvitationLink}
                  />
                ) : (
                  <ReactIconNavigate
                    explanationText={t("main-bar-invite-icon-text")}
                    icon={IoAddCircleOutline}
                    containerHeight='8'
                    containerWidth='7'
                    iconSize={3.5}
                    iconScale={1.1}
                    translateY={0.15}
                    translateX={isSlimDevice ? 0.5 : -0.3}
                    iconExplanationWidth={5}
                    iconExplanationTextAlignment='center'
                    route={dynamicRoutes.shareGroup(
                      group.initialGroupName,
                      groupCode,
                    )}
                    {...addUserReactIconStyles}
                  />
                )}
              </span>
              <span className={styles.instantSplitLogo}>
                <InstantSplitLogo width='24' />
              </span>
              <span className={styles.icon}>
                <ReactIconNavigate
                  icon={LuMenu}
                  containerHeight='8'
                  containerWidth='7'
                  iconSize={3.5}
                  iconScale={1.1}
                  translateY={0.15}
                  translateX={isSlimDevice ? 0.5 : -0.3}
                  iconExplanationWidth={5}
                  iconExplanationTextAlignment='center'
                  iconExplanationIsIdleTranslateX={isSlimDevice ? 0.5 : -0.3}
                  explanationText={t("main-bar-more-icon-text")}
                  onClick={showUserSettings}
                />
              </span>
            </span>
          )}

          <span className={barClass} role='toolbar' aria-label='user settings'>
            <span className={styles.icon}>
              <ReactIconNavigate
                icon={IoArrowBackCircleOutline}
                containerHeight='8'
                containerWidth={isVerySlimDevice ? "6" : "7"}
                explanationText={t("main-bar-back-icon-text")}
                iconExplanationWidth='6'
                iconSize={isVerySlimDevice ? 3 : 3.5}
                iconScale={1.05}
                onClick={hideUserSettings}
              />
            </span>
            <span className={styles.icon}>
              <ReactIconNavigate
                icon={IoInformationCircleOutline}
                containerHeight='8'
                containerWidth={isVerySlimDevice ? "6" : "7"}
                explanationText={t("main-bar-tutorial-icon-text")}
                iconExplanationWidth='8'
                route={dynamicRoutes.tutorial(
                  group?.initialGroupName,
                  groupCode,
                )}
                iconSize={isVerySlimDevice ? 3 : 3.5}
                iconScale={1.1}
                translateY={0.1}
              />
            </span>
            <span className={styles.icon}>
              <ReactIconNavigate
                icon={IoChatboxOutline}
                containerHeight='8'
                containerWidth={isVerySlimDevice ? "6" : "7"}
                explanationText={t("main-bar-contact-icon-text")}
                iconExplanationWidth='5'
                route={dynamicRoutes.contact(groupCode)}
                iconSize={isVerySlimDevice ? 3 : 3.5}
                iconScale={0.95}
              />
            </span>
            <span className={styles.icon}>
              <ReactIconNavigate
                icon={PiUserSwitchLight}
                containerHeight='8'
                containerWidth={isVerySlimDevice ? "6" : "7"}
                explanationText={t("main-bar-manage-groups-icon-text")}
                iconExplanationWidth='7'
                route={ROUTES.MANAGE_GROUPS}
                iconSize={isVerySlimDevice ? 3 : 3.5}
                iconScale={1}
                translateY={0.1}
              />
            </span>
            <span className={styles.icon}>
              <ReactIconNavigate
                icon={IoEnterOutline}
                containerHeight='8'
                containerWidth={isVerySlimDevice ? "6" : "7"}
                iconExplanationWidth='6'
                explanationText={t("main-bar-leave-group-icon-text")}
                route={dynamicRoutes.leaveGroup(group?.groupName, groupCode)}
                iconSize={isVerySlimDevice ? 3 : 3.5}
                iconScale={1.1}
                translateX={isVerySlimDevice ? 0 : -0.3}
              />
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default DefaultAndUserSettingsBar;
