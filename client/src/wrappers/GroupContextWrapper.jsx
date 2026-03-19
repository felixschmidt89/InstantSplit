import { Outlet, useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useGroupContext } from "../context/GroupContext.jsx";
import getActiveGroupCodeFromLocalStorage from "../utils/localStorage/getActiveGroupCodeFromLocalStorage.js";
import CLIENT_STATIC_ROUTES from "../constants/clientStaticRoutesConstants.js";

const { HOME } = CLIENT_STATIC_ROUTES;

const GroupContextWrapper = () => {
  const { groupCode } = useParams();
  const { setActiveGroupCode, activeGroupCode } = useGroupContext();

  const currentCode =
    groupCode || activeGroupCode || getActiveGroupCodeFromLocalStorage();

  useEffect(() => {
    const shouldUpdateContext = Boolean(
      groupCode && groupCode !== activeGroupCode,
    );

    if (shouldUpdateContext) {
      setActiveGroupCode(groupCode);
    }
  }, [groupCode, activeGroupCode, setActiveGroupCode]);

  if (!currentCode) {
    return <Navigate to={HOME} replace />;
  }

  return <Outlet />;
};

export default GroupContextWrapper;
