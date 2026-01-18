// React and Third-Party Libraries
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";

// Constants and Utils
import { setRouteInLocalStorage } from "../../../utils/localStorageUtils";
import { routeButtonStyles } from "../../../constants/stylesConstants";

// Styles
import styles from "./RouteButton.module.css";

const iconMap = {
  edit: EditIcon,
  history: HistoryIcon,
};

/**
 * Button for navigating to a specified route with optional setting of previousRoute or nestedPreviousRoute in localStorage (needed for InAppNavgationBar component)
 *
 * @param {Object} props - The properties of the component.
 * @param {string} props.route - The route to navigate to when the button is clicked.
 * @param {string} [props.buttonText="update"] - The text content of the button.
 *  @param {boolean} props.setPreviousRoute - If true, sets the current page as previous route in localStorage.
 * @param {boolean} props.setNestedPreviousRoute - If true, sets sets the current page as nested previous route in localStorage.
 * @param {string} [props.iconName] - The name of the icon to be displayed at the end of the button. Available names: "edit", "history". Add more: https://mui.com/material-ui/material-icons/
 * @returns {JSX.Element} React component. */
const RouteButton = ({
  route,
  buttonText,
  setPreviousRoute,
  setNestedPreviousRoute,
  endIcon,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (setPreviousRoute) {
      setRouteInLocalStorage(window.location.pathname, "previousRoute");
    } else if (setNestedPreviousRoute) {
      setRouteInLocalStorage(window.location.pathname, "nestedPreviousRoute");
    }
    navigate(`/${route}`);
  };

  const IconComponent = endIcon ? iconMap[endIcon] : null;

  return (
    <div className={styles.container}>
      <Button
        onClick={handleClick}
        style={routeButtonStyles}
        color='primary'
        variant='outlined'
        type='submit'
        endIcon={IconComponent ? <IconComponent /> : null}>
        {buttonText}
      </Button>
    </div>
  );
};

export default RouteButton;
