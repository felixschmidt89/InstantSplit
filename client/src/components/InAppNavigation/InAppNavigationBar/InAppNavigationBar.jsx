import {
  IoArrowBackCircleOutline,
  IoCloseCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { useTranslation } from "react-i18next";

import styles from "./InAppNavigationBar.module.css";
import { ROUTES } from "../../../constants/routesConstants";
import { debugLog } from "../../../../../shared/utils/debug/debugLog";
import { LOCAL_STORAGE_KEYS } from "../../../constants/localStorageConstants";
import {
  deleteGroupCode,
  getActiveGroupCode,
  getLocalStorageKey,
} from "../../../utils/localStorage";
import InstantSplitLogo from "../../InstantSplitLogo/InstantSplitLogo";
import useAppNavigate from "../../../hooks/useAppNavigate";

const InAppNavigationBar = ({
  back = false,
  backRoute = ROUTES.INSTANT_SPLIT,
  abort = false,
  abortRoute = ROUTES.INSTANT_SPLIT,
  previousRoute = false,
  nestedPreviousRoute = false,
  home = false,
  homeRoute = ROUTES.INSTANT_SPLIT,
  forward = false,
  forwardRoute = ROUTES.INSTANT_SPLIT,
  logoOnly = false,
}) => {
  const { t } = useTranslation();
  const navigate = useAppNavigate();

  const handleNavigation = (route) => {
    debugLog("Navigating to:", route);
    navigate(route);
  };

  const handleNestedNavigation = () => {
    const localStorageKey = nestedPreviousRoute
      ? LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE
      : LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE;

    const retrievedRoute = getLocalStorageKey(localStorageKey);

    if (!retrievedRoute) {
      debugLog(`Navigation aborted: No route found for key ${localStorageKey}`);
      return;
    }

    debugLog("Navigating to:", retrievedRoute);
    navigate(retrievedRoute);
  };

  const handleAbort = (route) => {
    const groupCode = getActiveGroupCode();
    deleteGroupCode(groupCode);
    debugLog("Navigating to main application");
    navigate(route);
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.leftIcon}>
        {back && (
          <div
            className={styles.iconContainer}
            onClick={() => handleNavigation(backRoute)}>
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
            onClick={() => handleAbort(abortRoute)}>
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
          linkToInstantSplitPage={!logoOnly && !forward}
        />
      </div>
      <div className={styles.rightIcon}>
        {home && (
          <div
            className={styles.iconContainer}
            onClick={() => handleNavigation(homeRoute)}>
            <GoHome className={`${styles.rightAlignedIcon} ${styles.icon}`} />
            <div className={styles.text}>
              {t("in-app-navigation-main-icon-text")}
            </div>
          </div>
        )}
        {forward && (
          <div
            className={styles.iconContainer}
            onClick={() => handleNavigation(forwardRoute)}>
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
