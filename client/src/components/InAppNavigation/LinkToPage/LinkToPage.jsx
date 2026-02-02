import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  setPreviousRoute,
  setNestedPreviousRoute,
} from "@client-utils/localStorage";

const LinkToPage = ({
  to,
  children,
  setPreviousRoute: shouldSetPreviousRoute,
  setNestedPreviousRoute: shouldSetNestedPreviousRoute,
  color,
  hoverColor,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLinkClick = (event) => {
    event.preventDefault();

    if (shouldSetPreviousRoute) {
      setPreviousRoute(pathname);
    } else if (shouldSetNestedPreviousRoute) {
      setNestedPreviousRoute(pathname);
    }

    navigate(to);
  };

  return (
    <Link
      to={to}
      onClick={handleLinkClick}
      style={{ color }}
      onMouseEnter={(e) => {
        if (hoverColor) e.target.style.color = hoverColor;
      }}
      onMouseLeave={(e) => {
        e.target.style.color = color;
      }}>
      {children}
    </Link>
  );
};

export default LinkToPage;
