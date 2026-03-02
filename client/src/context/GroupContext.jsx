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
  setActiveGroupCodeInLocalStorage,
} from "../utils/localStorage";
import { LOCAL_STORAGE_KEYS } from "../constants/localStorageConstants";
import useFetchGroupMembers from "../hooks/useFetchGroupMembers";

const { ACTIVE_GROUP_CODE } = LOCAL_STORAGE_KEYS;

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  // CODECHANGE: Renamed to setInternalActiveGroupCode for a clean, professional distinction from the custom setter
  const [activeGroupCode, setInternalActiveGroupCode] = useState(() =>
    getActiveGroupCode(),
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

  const getFirstAvailableGroupCode = useCallback(() => {
    const storedGroupCodes = getStoredGroupCodes();
    return storedGroupCodes?.length ? storedGroupCodes[0] : null;
  }, []);

  // Public setter that coordinates local storage and state
  const setActiveGroupCode = useCallback((newCode) => {
    setActiveGroupCodeInLocalStorage(newCode);
    setInternalActiveGroupCode(newCode);
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

  const getMemberName = useCallback(
    (id) => {
      if (!id) return "Unknown";
      return membersMap[id] || "Unknown Member";
    },
    [membersMap],
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === ACTIVE_GROUP_CODE) {
        setInternalActiveGroupCode(event.newValue);
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
