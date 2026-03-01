import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  deleteGroupCode,
  getActiveGroupCode,
  getStoredGroupCodes,
  setActiveGroupCode as setLocalStorageActiveGroup,
} from "../utils/localStorage";
import { LOCAL_STORAGE_KEYS } from "../constants/localStorageConstants";
import useFetchGroupMembers from "../hooks/useFetchGroupMembers";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [activeGroupCode, setActiveGroupCodeState] = useState(() =>
    getActiveGroupCode(),
  );

  const getFirstAvailableGroupCode = useCallback(() => {
    const storedGroupCodes = getStoredGroupCodes();
    return storedGroupCodes?.length ? storedGroupCodes[0] : null;
  }, []);

  const setActiveGroupCode = useCallback((newCode) => {
    setLocalStorageActiveGroup(newCode);
    setActiveGroupCodeState(newCode);
  }, []);

  const removeGroup = useCallback(
    (groupCode) => {
      const success = deleteGroupCode(groupCode);

      if (success && activeGroupCode === groupCode) {
        const nextGroup = getFirstAvailableGroupCode();
        setActiveGroupCode(nextGroup);
      }
      return success;
    },
    [activeGroupCode, getFirstAvailableGroupCode, setActiveGroupCode],
  );

  const { groupMembers, isFetched, error, refetch } =
    useFetchGroupMembers(activeGroupCode);

  const membersMap = useMemo(() => {
    const map = {};
    if (groupMembers?.length) {
      groupMembers.forEach((member) => {
        map[member._id] = member.userName;
      });
    }
    return map;
  }, [groupMembers]);

  const getMemberName = useCallback(
    (id) => {
      if (!id) return "Unknown";
      return membersMap[id] || "Unknown Member";
    },
    [membersMap],
  );

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE) {
        setActiveGroupCodeState(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const value = {
    activeGroupCode,
    setActiveGroupCode,
    removeGroup,
    getFirstAvailableGroupCode,
    groupMembers: groupMembers || [],
    getMemberName,
    isFetched,
    error,
    refreshGroupMembers: refetch,
  };

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroupContext must be used within a GroupProvider");
  }
  return context;
};
