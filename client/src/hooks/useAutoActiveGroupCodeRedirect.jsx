import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGroupContext } from "../context/GroupContext";
import { getFirstGroupCodeFromLocalStorage } from "../utils/localStorage";
import { TO } from "../constants/clientRouteLinks.js";

const { INSTANT_SPLIT } = TO;

const useAutoActiveGroupCodeRedirect = () => {
  const navigate = useNavigate();
  const { activeGroupCode, updateActiveGroup } = useGroupContext();

  useEffect(() => {
    let effectiveCode = activeGroupCode;

    if (!effectiveCode) {
      const persistedCode = getFirstGroupCodeFromLocalStorage();

      if (persistedCode) {
        updateActiveGroup(persistedCode);
        effectiveCode = persistedCode;
      }
    }

    if (effectiveCode) {
      navigate(INSTANT_SPLIT);
    }
  }, [activeGroupCode, updateActiveGroup, navigate]);
};

export default useAutoActiveGroupCodeRedirect;
