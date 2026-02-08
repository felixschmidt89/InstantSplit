import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGroupContext } from "../context/GroupContext"; // Import RAM
import { getFirstGroupCode } from "../utils/localStorage";
import { ROUTES } from "../constants/routesConstants";

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
      navigate(`/${ROUTES.INSTANT_SPLIT}`);
    }
  }, [activeGroupCode, updateActiveGroup, navigate]);
};

export default useAutoActiveGroupCodeRedirect;
