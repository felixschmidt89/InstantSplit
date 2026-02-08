import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useAppNavigate = () => {
  const navigate = useNavigate();

  const appNavigate = useCallback(
    (route, options) => {
      if (typeof route === "number") {
        navigate(route);
        return;
      }

      if (!route || typeof route !== "string") {
        return;
      }

      const trimmedRoute = route.trim();
      if (trimmedRoute.length === 0) {
        return;
      }

      const target = trimmedRoute.startsWith("/")
        ? trimmedRoute
        : `/${trimmedRoute}`;

      navigate(target, options);
    },
    [navigate],
  );

  return appNavigate;
};

export default useAppNavigate;
