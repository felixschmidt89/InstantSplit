import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";

// CODECHANGE: Use path aliases and atomic utilities
import {
  setPreviousRoute,
  setNestedPreviousRoute,
} from "@client-utils/localStorage";

import styles from "./RouteButton.module.css";
import { routeButtonStyles } from "@/constants/stylesConstants";

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
      setPreviousRoute(pathname);
    } else if (shouldSetNested) {
      setNestedPreviousRoute(pathname);
    }

    navigate(`/${route}`);
  };

  const IconComponent = endIcon ? iconMap[endIcon] : null;

  return (
    <div className={styles.container}>
      <Button
        onClick={handleClick}
        sx={routeButtonStyles}
        color='primary'
        variant='outlined'
        endIcon={IconComponent ? <IconComponent /> : null}>
        {buttonText}
      </Button>
    </div>
  );
};

export default RouteButton;
