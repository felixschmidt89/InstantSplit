import {
  IoArrowBackCircleOutline,
  IoCloseCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { useTranslation } from "react-i18next";

import styles from "./InAppNavigationBar.module.css";
import { TO } from "../../../constants/navigationConstants";
import { debugLog } from "../../../../../shared/utils/debug/debugLog";
import { LOCAL_STORAGE_KEYS } from "../../../constants/localStorageConstants";
import {
  deleteGroupCode,
  getActiveGroupCode,
  getLocalStorageKey,
} from "../../../utils/localStorage";
import InstantSplitLogo from "../../InstantSplitLogo/InstantSplitLogo";
import useAppNavigate from "../../../hooks/useAppNavigate";

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
