import {
  IoArrowBackCircleOutline,
  IoCloseCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "./InAppNavigationBar.module.css";
import { TO } from "../../../constants/navigationConstants";
import { debugLog } from "../../../../../shared/utils/debug/debugLog";
import { useGroupContext } from "../../../context/GroupContext"; // Added Context
import {
  getPreviousRouteFromLocalStorage,
  getNestedPreviousRouteFromLocalStorage,
} from "../../../utils/localStorage";
import InstantSplitLogo from "../../InstantSplitLogo/InstantSplitLogo";

const { INSTANT_SPLIT } = TO;

const InAppNavigationBar = ({
  back = false,
  backTo = INSTANT_SPLIT,
  abort = false,
  abortTo = INSTANT_SPLIT,
  previousRoute = false,
  nestedPreviousRoute = false,
  home = false,
  homeTo = INSTANT_SPLIT,
  forward = false,
  forwardTo = INSTANT_SPLIT,
  logoOnly = false,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { activeGroupCode, removeGroup } = useGroupContext();

  const handleNavigation = (route) => {
    debugLog("Navigating to:", route);
    navigate(route);
  };

  const handleNestedNavigation = () => {
    const retrievedRoute = nestedPreviousRoute
      ? getNestedPreviousRouteFromLocalStorage()
      : getPreviousRouteFromLocalStorage();

    if (!retrievedRoute) {
      debugLog("Navigation aborted: No stored route found.");
      return;
    }

    debugLog("Navigating to stored route:", retrievedRoute);
    navigate(retrievedRoute);
  };

  const handleAbort = (route) => {
    removeGroup(activeGroupCode);
    debugLog("Aborted and navigating to:", route);

    navigate(route);
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.leftIcon}>
        {back && (
          <div
            className={styles.iconContainer}
            onClick={() => handleNavigation(backTo)}>
            <IoArrowBackCircleOutline
              className={`${styles.leftAlignedIcon} ${styles.icon}`}
            />
            <div className={styles.text}>
              {t("in-app-navigation-back-icon-text")}
            </div>
          </div>
        )}
        {(previousRoute || nestedPreviousRoute) && (
          <div
            className={styles.iconContainer}
            onClick={handleNestedNavigation}>
            <IoArrowBackCircleOutline
              className={`${styles.leftAlignedIcon} ${styles.icon}`}
            />
            <div className={styles.text}>
              {t("in-app-navigation-back-icon-text")}
            </div>
          </div>
        )}
        {abort && (
          <div
            className={styles.iconContainer}
            onClick={() => handleAbort(abortTo)}>
            <IoCloseCircleOutline
              className={`${styles.leftAlignedIcon} ${styles.icon}`}
            />
            <div className={styles.text}>
              {t("in-app-navigation-abort-icon-text")}
            </div>
          </div>
        )}
      </div>

      <div className={styles.middleLogo}>
        <InstantSplitLogo
          className={styles.instantSplitLogo}
          isLink={!logoOnly && !forward}
        />
      </div>

      <div className={styles.rightIcon}>
        {home && (
          <div
            className={styles.iconContainer}
            onClick={() => handleNavigation(homeTo)}>
            <GoHome className={`${styles.rightAlignedIcon} ${styles.icon}`} />
            <div className={styles.text}>
              {t("in-app-navigation-main-icon-text")}
            </div>
          </div>
        )}
        {forward && (
          <div
            className={styles.iconContainer}
            onClick={() => handleNavigation(forwardTo)}>
            <IoArrowForwardCircleOutline
              className={`${styles.rightAlignedIcon} ${styles.icon}`}
            />
            <div className={styles.text}>
              {t("in-app-navigation-next-icon-text")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InAppNavigationBar;
