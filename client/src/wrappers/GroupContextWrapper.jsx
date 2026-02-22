import { Outlet, useParams } from "react-router-dom";

import { GroupProvider } from "../context/GroupContext";
import { getActiveGroupCode } from "../utils/localStorage/getActiveGroupCode";

const GroupContextWrapper = () => {
  const { groupCode } = useParams();

  const activeGroupCode = groupCode || getActiveGroupCode();

  const hasActiveGroupCode = Boolean(activeGroupCode);

  if (!hasActiveGroupCode) {
    return <Outlet />;
  }

  return (
    <GroupProvider groupCode={activeGroupCode}>
      <Outlet />
    </GroupProvider>
  );
};

export default GroupContextWrapper;
