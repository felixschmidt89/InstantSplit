import { useEffect } from "react";
import { useGroupContext } from "../context/GroupContext";
import { getFirstGroupCode } from "../utils/localStorage";
import { TO } from "../constants/navigationConstants.js";
import { useNavigate } from "react-router-dom";

const { INSTANT_SPLIT } = TO;

const useAutoActiveGroupCodeRedirect = () => {
  const navigate = useNavigate();
  const { activeGroupCode, updateActiveGroup } = useGroupContext();

  useEffect(() => {
    let currentCode = activeGroupCode;

    if (!currentCode) {
      const storedCode = getFirstGroupCode();

      if (storedCode) {
        updateActiveGroup(storedCode);
        currentCode = storedCode;
      }
    }

    if (currentCode) {
      navigate(INSTANT_SPLIT);
    }
  }, [activeGroupCode, updateActiveGroup, navigate]);
};

export default useAutoActiveGroupCodeRedirect;
