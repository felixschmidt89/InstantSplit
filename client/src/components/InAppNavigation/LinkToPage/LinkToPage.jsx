import { useLocation, Link } from "react-router-dom";
import useAppNavigate from "../../../hooks/useAppNavigate";
import {
  setNestedPreviousRoute as setNestedPreviousRouteInLocalStorage,
  setPreviousRoute as setPreviousRouteInLocalStorage,
} from "../../../utils/localStorage";

import styles from "./LinkToPage.module.css";

const LinkToPage = ({
  to,
  children,
  setPreviousRoute,
  setNestedPreviousRoute,
}) => {
  const navigate = useAppNavigate();
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
