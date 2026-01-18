import { useNavigate } from "react-router-dom";
import {
  IoArrowBackCircleOutline,
  IoCloseCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { useTranslation } from "react-i18next";

import { devLog } from "@utils/errorUtils";
import {
  deleteGroupDataFromLocalStorage,
  getRouteFromLocalStorage,
  getActiveGroupCode,
} from "@utils/localStorageUtils";
import { ROUTES } from "@constants/routesConstants";
import { LOCAL_STORAGE_KEYS } from "@constants/localStorageConstants";
import InstantSplitLogo from "@components/InstantSplitLogo/InstantSplitLogo";

import styles from "./InAppNavigationBar.module.css";

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
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    devLog("Navigating to:", route);
    navigate(route);
  };

  const handleNestedNavigation = () => {
    const localStorageKey = nestedPreviousRoute
      ? LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE
      : LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE;

    const retrievedRoute = getRouteFromLocalStorage(localStorageKey);

    devLog("Navigating to:", retrievedRoute);
    navigate(retrievedRoute);
  };

  const handleAbort = (route) => {
    const groupCode = getActiveGroupCode();
    deleteGroupDataFromLocalStorage(groupCode);
    devLog("Navigating to main application");
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
