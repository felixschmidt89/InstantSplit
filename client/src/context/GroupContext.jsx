import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import deleteActiveGroupCodeFromLocalStorage from "../utils/localStorage/deleteActiveGroupCodeFromLocalStorage.js";
import deleteGroupCodeFromLocalStorage from "../utils/localStorage/deleteGroupCodeFromLocalStorage.js";
import getActiveGroupCodeFromLocalStorage from "../utils/localStorage/getActiveGroupCodeFromLocalStorage.js";
import getStoredGroupCodesFromLocalStorage from "../utils/localStorage/getStoredGroupCodesFromLocalStorage.js";
import setActiveGroupCodeInLocalStorage from "../utils/localStorage/setActiveGroupCodeInLocalStorage.js";

import { LOCAL_STORAGE_KEYS } from "../constants/localStorageConstants.js";
import useFetchGroupMembers from "../hooks/useFetchGroupMembers.jsx";
import debugLog from "../../../shared/utils/debug/debugLog.js";
import { LOG_LEVELS } from "../../../shared/constants/system/loggerConstants.js";

const { ACTIVE_GROUP_CODE, STORED_GROUP_CODES } = LOCAL_STORAGE_KEYS;
const { INFO, DEBUG } = LOG_LEVELS;

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [storedGroupCodes, setStoredGroupCodes] = useState(() =>
    getStoredGroupCodesFromLocalStorage(),
  );

  const [activeGroupCode, setInternalActiveGroupCode] = useState(() =>
    getActiveGroupCodeFromLocalStorage(),
  );

  const { groupMembers, isFetched, isLoading, error, refetch } =
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
    debugLog("Setting active group code", { newCode }, DEBUG);
    if (newCode) {
      setActiveGroupCodeInLocalStorage(newCode);
    } else {
      deleteActiveGroupCodeFromLocalStorage();
    }
    setInternalActiveGroupCode(newCode);
  }, []);

  const refreshStoredGroupCodes = useCallback(() => {
    const updatedCodes = getStoredGroupCodesFromLocalStorage();
    setStoredGroupCodes(updatedCodes);
  }, []);

  const removeGroup = useCallback(
    (groupCode, shouldAutoSwitch = true) => {
      debugLog(
        "GroupContext: Removing group",
        { groupCode, shouldAutoSwitch },
        INFO,
      );

      const isDeleted = deleteGroupCodeFromLocalStorage(groupCode);

      if (isDeleted) {
        setStoredGroupCodes((prev) => {
          const updatedList = prev.filter((code) => code !== groupCode);

          if (activeGroupCode === groupCode) {
            if (shouldAutoSwitch && updatedList.length > 0) {
              const nextGroup = updatedList[0];
              setActiveGroupCode(nextGroup);
            } else {
              setActiveGroupCode(null);
            }
          }

          return updatedList;
        });
      }

      return isDeleted;
    },
    [activeGroupCode, setActiveGroupCode],
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

  const value = useMemo(
    () => ({
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
      isLoading,
      error,
      refreshGroupMembers: refetch,
    }),
    [
      activeGroupCode,
      setActiveGroupCode,
      storedGroupCodes,
      refreshStoredGroupCodes,
      removeGroup,
      getFirstAvailableGroupCode,
      groupMembers,
      getMemberName,
      isFetched,
      isLoading,
      error,
      refetch,
    ],
  );

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
