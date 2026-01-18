// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./GetStartedSection.module.css";
import RouteButton from "../../../InAppNavigation/RouteButton/RouteButton";

/**
 * Component for rendering the get started section on the home page.
 *
 * @returns {JSX.Element} React component. */
const GetStartedSection = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.groupContainer}>
        <RouteButton
          route={`onboarding-create-group`}
          buttonText={t("get-started-create-group-button")}
        />
        <RouteButton
          route={`onboarding-enter-groupcode`}
          buttonText={t("get-started-join-group-button")}
        />
      </div>
    </>
  );
};

export default GetStartedSection;
