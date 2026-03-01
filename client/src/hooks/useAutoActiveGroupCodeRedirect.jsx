import { useEffect } from "react";
import { useGroupContext } from "../context/GroupContext";
import { getFirstGroupCode } from "../utils/localStorage";
import useAppNavigate from "./useAppNavigate";
import { TO } from "../constants/navigationConstants.js";

const { INSTANT_SPLIT } = TO;

const useAutoActiveGroupCodeRedirect = () => {
  const navigate = useAppNavigate();
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
