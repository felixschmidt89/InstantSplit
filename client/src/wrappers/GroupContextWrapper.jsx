import { Outlet, useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useGroupContext } from "../context/GroupContext";
import { getActiveGroupCode } from "../utils/localStorage/getActiveGroupCode";
import { ROUTES } from "../constants/routesConstants";

const GroupContextWrapper = () => {
  const { groupCode } = useParams();
  const { setActiveGroupCode, activeGroupCode } = useGroupContext();

  useEffect(() => {
    if (groupCode && groupCode !== activeGroupCode) {
      setActiveGroupCode(groupCode);
    }
  }, [groupCode, activeGroupCode, setActiveGroupCode]);

  const currentCode = groupCode || activeGroupCode || getActiveGroupCode();

  if (!currentCode) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default GroupContextWrapper;
