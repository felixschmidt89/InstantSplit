import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@client-constants/routesConstants";
import {
  getActiveGroupCode,
  getFirstGroupCode,
  setActiveGroupCode,
} from "@client-utils/localStorage";

const useAutoActiveGroupCodeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let groupCode = getActiveGroupCode();

    if (!groupCode) {
      groupCode = getFirstGroupCode();

      if (groupCode) {
        setActiveGroupCode(groupCode);
      }
    }

    if (groupCode) {
      navigate(ROUTES.INSTANT_SPLIT);
    }
  }, [navigate]);
};

export default useAutoActiveGroupCodeRedirect;
