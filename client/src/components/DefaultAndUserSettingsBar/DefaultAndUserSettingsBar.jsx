import { useEffect, useRef, useState } from "react";
import { LuMenu } from "react-icons/lu";
import {
  IoInformationCircleOutline,
  IoEnterOutline,
  IoAddCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";

import styles from "./DefaultAndUserSettingsBar.module.css";
import { useGroupContext } from "../../context/GroupContext";
import useIsSlimDevice from "../../hooks/useIsSlimDevice";
import { isWebShareSupported } from "../../utils/user";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import { addUserReactIconStyles } from "../../constants/stylesConstants";
import { TO, TO_GROUP_ACTIONS } from "../../constants/clientRouteLinks";
import WebShareApiInvite from "../ShareGroupInvitation/WebShareApiInvite/WebShareApiInvite";
import ReactIconNavigate from "../InAppNavigation/ReactIconNavigate/ReactIconNavigate";
import InstantSplitLogo from "../InstantSplitLogo/InstantSplitLogo";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const DefaultAndUserSettingsBar = () => {
  const containerRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { isSlimDevice, isVerySlimDevice } = useIsSlimDevice();
  const [isDefaultBarShown, setIsDefaultBarShown] = useState(true);

  const { activeGroupCode } = useGroupContext();
  const canWebShare = isWebShareSupported();

  const { groupData, isFetched } = useFetchGroupData(activeGroupCode);

  const group = groupData?.group;
  const barClass = `${styles.userSettingsBar} ${
    isDefaultBarShown ? styles.showUserSettingsBar : styles.hideUserSettingsBar
  }`;

  const invitationLink =
    i18n.language === "de"
      ? TO_GROUP_ACTIONS.JOIN_DE(group?.initialGroupName || "", activeGroupCode)
      : TO_GROUP_ACTIONS.JOIN_EN(
          group?.initialGroupName || "",
          activeGroupCode,
        );

  const fullInvitationLink = `${baseUrl}${invitationLink}`;

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

  return (
    <div
      className={styles.container}
      role='toolbar'
      aria-label='top bar'
      ref={containerRef}>
      {!activeGroupCode ? (
        <span className={styles.spinner} />
      ) : (
        <div className={styles.topBarWrapper}>
          {group && (
            <span
              className={barClass}
              role='toolbar'
              aria-label='user settings'>
              <span className={styles.icon}>
                {canWebShare ? (
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
                    route={TO_GROUP_ACTIONS.SHARE(
                      group.initialGroupName,
                      activeGroupCode,
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
                route={TO_GROUP_ACTIONS.TUTORIAL(
                  group?.initialGroupName,
                  activeGroupCode,
                )}
                iconSize={isVerySlimDevice ? 3 : 3.5}
                iconScale={1.1}
                translateY={0.1}
              />
            </span>
            <span className={styles.icon}>
              <ReactIconNavigate
                icon={PiUserSwitchLight}
                containerHeight='8'
                containerWidth={isVerySlimDevice ? "6" : "7"}
                explanationText={t("main-bar-manage-groups-icon-text")}
                iconExplanationWidth='7'
                route={TO.MANAGE_GROUPS}
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
                route={TO_GROUP_ACTIONS.LEAVE(
                  group?.groupName,
                  activeGroupCode,
                )}
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
