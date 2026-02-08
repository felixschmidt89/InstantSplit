import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A wrapper around useNavigate that ensures all string paths
 * are treated as absolute paths (prepends '/' if missing).
 */
const useAppNavigate = () => {
  const navigate = useNavigate();

  const appNavigate = useCallback(
    (route, options) => {
      if (typeof route === "number") {
        navigate(route);
        return;
      }

      let target = route;

      if (typeof route === "string" && !route.startsWith("/")) {
        target = `/${route}`;
      }

      navigate(target, options);
    },
    [navigate],
  );

  return appNavigate;
};

export default useAppNavigate;
