import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@client-constants/routesConstants";
import {
  getActiveGroupCode,
  getFirstGroupCodeInStoredGroupCodesArray,
  setGroupCodeToCurrentlyActive,
} from "@client-utils/localStorageUtils";

const useAutoActiveGroupCodeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let groupCode = getActiveGroupCode();

    if (!groupCode) {
      groupCode = getFirstGroupCodeInStoredGroupCodesArray();

      if (groupCode) {
        setGroupCodeToCurrentlyActive(groupCode);
      }
    }

    if (groupCode) {
      navigate(ROUTES.INSTANT_SPLIT);
    }
  }, [navigate]);
};

export default useAutoActiveGroupCodeRedirect;
