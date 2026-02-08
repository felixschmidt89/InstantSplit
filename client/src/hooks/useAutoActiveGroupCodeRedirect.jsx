import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getActiveGroupCode,
  getFirstGroupCode,
  setActiveGroupCode,
} from "../utils/localStorage";
import { ROUTES } from "../constants/routesConstants";

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
      navigate(`/${ROUTES.INSTANT_SPLIT}`);
    }
  }, [navigate]);
};

export default useAutoActiveGroupCodeRedirect;
