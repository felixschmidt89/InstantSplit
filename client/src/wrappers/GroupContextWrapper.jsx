import { Outlet, useParams } from "react-router-dom";
import { GroupMembersProvider } from "../context/GroupMembersContext";

const GroupContextWrapper = () => {
  const { groupCode } = useParams();

  if (!groupCode) {
    return <Outlet />;
  }

  return (
    <GroupMembersProvider groupCode={groupCode}>
      <Outlet />
    </GroupMembersProvider>
  );
};

export default GroupContextWrapper;
