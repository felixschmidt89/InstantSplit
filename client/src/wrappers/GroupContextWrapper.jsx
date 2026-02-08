import { Outlet, useParams } from "react-router-dom";
import { GroupMembersProvider } from "../context/GroupMembersContext";
import { getActiveGroupCode } from "../utils/localStorage/getActiveGroupCode";

const GroupContextWrapper = () => {
  const { groupCode } = useParams();

  const activeGroupCode = groupCode || getActiveGroupCode();

  if (!activeGroupCode) {
    return <Outlet />;
  }

  return (
    <GroupMembersProvider groupCode={activeGroupCode}>
      <Outlet />
    </GroupMembersProvider>
  );
};

export default GroupContextWrapper;
