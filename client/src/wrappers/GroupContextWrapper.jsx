import { Outlet, useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useGroupContext } from "../context/GroupContext";
import { getActiveGroupCodeFromLocalStorage } from "../utils/localStorage/getActiveGroupCodeFromLocalStorage";

import { CLIENT_ROUTES } from "../constants/clientRoutesConstants";

const { HOME } = CLIENT_ROUTES;

const GroupContextWrapper = () => {
  const { groupCode } = useParams();
  const { setActiveGroupCode, activeGroupCode } = useGroupContext();

  useEffect(() => {
    if (groupCode && groupCode !== activeGroupCode) {
      setActiveGroupCode(groupCode);
    }
  }, [groupCode, activeGroupCode, setActiveGroupCode]);

  const currentCode =
    groupCode || activeGroupCode || getActiveGroupCodeFromLocalStorage();

  if (!currentCode) {
    return <Navigate to={HOME} replace />;
  }

  return <Outlet />;
};

export default GroupContextWrapper;
