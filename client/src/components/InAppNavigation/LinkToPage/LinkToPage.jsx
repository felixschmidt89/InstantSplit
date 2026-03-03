import { useLocation, Link, useNavigate } from "react-router-dom";

import {
  setNestedPreviousRouteInLocalStorage,
  setPreviousRouteInLocalStorage,
} from "../../../utils/localStorage/index.js";

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
