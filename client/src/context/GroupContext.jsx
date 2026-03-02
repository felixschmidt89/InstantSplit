import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import {
  deleteGroupCodeFromLocalStorage,
  getActiveGroupCodeFromLocalStorage,
  getStoredGroupCodesFromLocalStorage,
  setActiveGroupCodeInLocalStorage,
} from "../utils/localStorage";
import { LOCAL_STORAGE_KEYS } from "../constants/localStorageConstants";
import useFetchGroupMembers from "../hooks/useFetchGroupMembers";

const { ACTIVE_GROUP_CODE, STORED_GROUP_CODES } = LOCAL_STORAGE_KEYS;

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [storedGroupCodes, setStoredGroupCodes] = useState(() =>
    getStoredGroupCodesFromLocalStorage(),
  );

  const [activeGroupCode, setInternalActiveGroupCode] = useState(() =>
    getActiveGroupCodeFromLocalStorage(),
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
    return storedGroupCodes?.length ? storedGroupCodes[0] : null;
  }, [storedGroupCodes]);

  const setActiveGroupCode = useCallback((newCode) => {
    setActiveGroupCodeInLocalStorage(newCode);
    setInternalActiveGroupCode(newCode);
  }, []);

  const refreshStoredGroupCodes = useCallback(() => {
    const updatedCodes = getStoredGroupCodesFromLocalStorage();
    setStoredGroupCodes(updatedCodes);
  }, []);

  const removeGroup = useCallback(
    (groupCode) => {
      const isDeleted = deleteGroupCodeFromLocalStorage(groupCode);

      if (isDeleted) {
        setStoredGroupCodes((prev) =>
          prev.filter((code) => code !== groupCode),
        );

        if (activeGroupCode === groupCode) {
          const nextGroup = getFirstAvailableGroupCode();
          setActiveGroupCode(nextGroup);
        }
      }

      return isDeleted;
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
      if (event.key === STORED_GROUP_CODES) {
        setStoredGroupCodes(getStoredGroupCodesFromLocalStorage());
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const value = {
    activeGroupCode,
    setActiveGroupCode,
    storedGroupCodes,
    setStoredGroupCodes,
    refreshStoredGroupCodes,
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
