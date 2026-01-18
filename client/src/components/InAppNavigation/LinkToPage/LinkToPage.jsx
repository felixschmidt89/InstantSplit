// React and Third-Party Libraries
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Constants and Utils
import { setRouteInLocalStorage } from "../../../utils/localStorageUtils";

/**
 * Link component for navigating to a page with optional setting of previousRoute or nestedPreviousRoute in localStorage (needed for InAppNavgationBar component)
 *
 * @param {Object} props - The component props.
 * @param {string} props.to - The destination route.
 * @param {React.ReactNode} props.children - The content of the link.
 * @param {boolean} props.setPreviousRoute - If true, sets the current page as previous route in localStorage.
 * @param {boolean} props.setNestedPreviousRoute - If true, sets sets the current page as nested previous route in localStorage.
 *  @param {boolean} props.setCustomPreviousRoute - Flag to indicate if a custom previous route should be stored in localStorage.
 * @param {string} props.customRoute - The custom route to be stored in localStorage.
 * @param {string} props.customKey - The custom key under which to store the route in localStorage. Defaults to "previousRoute".
 * @param {string} props.color - The color of the link.
 * @param {string} props.hoverColor - The color of the link on hover.
 *
 * @returns {React.Component} The rendered LinkToPage component.
 */
const LinkToPage = ({
  to,
  children,
  setPreviousRoute,
  setNestedPreviousRoute,
  setCustomPreviousRoute,
  customRoute,
  customKey = "previousRoute",
  color,
  hoverColor,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (setPreviousRoute) {
      setRouteInLocalStorage(window.location.pathname, "previousRoute");
    } else if (setNestedPreviousRoute) {
      setRouteInLocalStorage(window.location.pathname, "nestedPreviousRoute");
    } else if (setCustomPreviousRoute) {
      setRouteInLocalStorage(customRoute, customKey);
    }
    navigate(to);
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      style={{
        color: color,
      }}
      onMouseEnter={(e) => (e.target.style.color = hoverColor)}
      onMouseLeave={(e) => (e.target.style.color = color)}>
      {children}
    </Link>
  );
};

export default LinkToPage;
