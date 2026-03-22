import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";

import styles from "./RouteButton.module.css";
import setNestedPreviousRouteInLocalStorage from "../../../utils/localStorage/setNestedPreviousRouteInLocalStorage.js";
import setPreviousRouteInLocalStorage from "../../../utils/localStorage/setPreviousRouteInLocalStorage.js";
import STYLES from "../../../constants/stylesConstants";

const { routeButtonStyles } = STYLES;

const iconMap = {
  edit: EditIcon,
  history: HistoryIcon,
};

const RouteButton = ({
  route,
  buttonText = "update",
  setPreviousRoute: shouldSetPrevious,
  setNestedPreviousRoute: shouldSetNested,
  endIcon,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    if (shouldSetPrevious) {
      setPreviousRouteInLocalStorage(pathname);
    } else if (shouldSetNested) {
      setNestedPreviousRouteInLocalStorage(pathname);
    }

    navigate(route);
  };

  const SelectedIcon = iconMap[endIcon];
  const renderEndIcon = endIcon && SelectedIcon ? <SelectedIcon /> : null;

  return (
    <div className={styles.container}>
      <Button
        onClick={handleClick}
        sx={routeButtonStyles}
        color='primary'
        variant='outlined'
        endIcon={renderEndIcon}>
        {buttonText}
      </Button>
    </div>
  );
};

export default RouteButton;
