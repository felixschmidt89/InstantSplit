import { useLocation, Link, useNavigate } from "react-router-dom";

import setNestedPreviousRouteInLocalStorage from "../../../utils/localStorage/setNestedPreviousRouteInLocalStorage.js";
import setPreviousRouteInLocalStorage from "../../../utils/localStorage/setPreviousRouteInLocalStorage.js";

import styles from "./LinkToPage.module.css";

const LinkToPage = ({
  to,
  children,
  setPreviousRoute,
  setNestedPreviousRoute,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLinkClick = (event) => {
    event.preventDefault();

    if (setPreviousRoute) {
      setPreviousRouteInLocalStorage(pathname);
    }

    if (setNestedPreviousRoute) {
      setNestedPreviousRouteInLocalStorage(pathname);
    }

    navigate(to);
  };

  return (
    <Link to={to} onClick={handleLinkClick} className={styles.link}>
      {children}
    </Link>
  );
};

export default LinkToPage;
