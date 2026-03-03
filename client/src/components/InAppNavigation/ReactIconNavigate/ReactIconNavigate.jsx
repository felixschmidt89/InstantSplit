import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReactIconNavigate.module.css";

import { useGroupContext } from "../../../context/GroupContext.jsx";
import { LOG_LEVELS } from "../../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../../shared/utils/debug/debugLog.js";

const { DEBUG } = LOG_LEVELS;

const ReactIconNavigate = ({
  route,
  onClick,
  icon: IconComponent,
  explanationText,
  iconSize = 2.5,
  iconScale = 1,
  containerHeight = 5,
  containerWidth = 5,
  marginRight = 0,
  email,
  url,
  translateY = 0,
  translateX = 0,
  fontWeight = 400,
  iconExplanationWidth = 7,
  iconExplanationIsIdle = false,
  iconExplanationIsIdleTranslateX = 0,
  iconExplanationTextAlignment = "center",
}) => {
  const navigate = useNavigate();
  const { activeGroupCode } = useGroupContext();

  const handleIconClick = () => {
    if (email) {
      window.location.href = `mailto:${email}`;
    } else if (url) {
      window.open(url, "_blank");
    } else {
      if (typeof onClick === "function") {
        onClick();
      } else {
        debugLog(
          "ReactIconNavigate: Navigating to route",
          { route, activeGroupCode },
          DEBUG,
        );

        navigate(route);
      }
    }
  };

  return (
    <div
      className={styles.iconContainer}
      style={{
        height: `${containerHeight}rem`,
        width: `${containerWidth}rem`,
      }}
      onClick={handleIconClick}
      role='button'
      tabIndex={0}>
      <IconComponent
        className={styles.customIcon}
        style={{
          fontSize: `${iconSize}rem`,
          marginRight: `${marginRight}rem`,
          transform: `translate(${translateX}rem, ${translateY}rem) scale(${iconScale})`,
          fontWeight: fontWeight,
        }}
      />
      {explanationText && (
        <span
          className={`${styles.iconExplanation} ${
            iconExplanationIsIdle ? styles.iconExplanationIsIdle : ""
          }`}
          style={{
            width: `${iconExplanationWidth}rem`,
            textAlign: `${iconExplanationTextAlignment}`,
            transform: `translateX(${iconExplanationIsIdleTranslateX}rem)`,
          }}>
          {explanationText}
        </span>
      )}
    </div>
  );
};

export default ReactIconNavigate;
