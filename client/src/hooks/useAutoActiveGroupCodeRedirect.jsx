import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirstGroupCodeInStoredGroupCodesArray,
  setGroupCodeToCurrentlyActive,
} from "../utils/localStorageUtils";
import { ROUTES } from "../constants/routesConstants";

const useAutoActiveGroupCodeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Make this a utility function since it's used in multiple places
    // TODO: Add local storage key constants file
    let groupCode = localStorage.getItem("activeGroupCode");

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
