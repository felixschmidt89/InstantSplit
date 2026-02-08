import { createContext, useContext, useMemo } from "react";
import useFetchGroupMembers from "../hooks/useFetchGroupMembers.jsx";

const GroupMembersContext = createContext();

export const GroupMembersProvider = ({ groupCode, children }) => {
  const { groupMembers, isFetched, error, refetch } =
    useFetchGroupMembers(groupCode);

  const membersMap = useMemo(() => {
    const map = {};
    if (groupMembers?.length) {
      groupMembers.forEach((member) => {
        map[member._id] = member.userName;
      });
    }
    return map;
  }, [groupMembers]);

  const getMemberName = (id) => {
    if (!id) return "Unknown";
    return membersMap[id] || "Unknown Member";
  };

  const value = {
    groupMembers: groupMembers || [],
    groupCode, // <--- Add this so children can access it!
    getMemberName,
    isFetched,
    error,
    refreshGroupMembers: refetch, // <--- Add this so children can trigger updates!
  };

  return (
    <GroupMembersContext.Provider value={value}>
      {children}
    </GroupMembersContext.Provider>
  );
};

export const useGroupMembersContext = () => {
  const context = useContext(GroupMembersContext);
  if (!context) {
    throw new Error(
      "useGroupMembersContext must be used within a GroupMembersProvider",
    );
  }
  return context;
};
