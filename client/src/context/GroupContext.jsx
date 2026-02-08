import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  deleteGroupCode,
  getActiveGroupCode,
  setActiveGroupCode,
} from "../utils/localStorage";
import { LOCAL_STORAGE_KEYS } from "../constants/localStorageConstants";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [activeGroupCode, setActiveGroupCodeState] = useState(() =>
    getActiveGroupCode(),
  );

  // Update RAM and Disk
  const updateActiveGroup = useCallback((newCode) => {
    setActiveGroupCode(newCode);
    setActiveGroupCodeState(newCode);
  }, []);

  const removeGroup = useCallback(
    (groupCode) => {
      const success = deleteGroupCode(groupCode);

      if (success) {
        if (activeGroupCode === groupCode) {
          setActiveGroupCodeState(null);
        }
      }
      return success;
    },
    [activeGroupCode],
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

  return (
    <GroupContext.Provider
      value={{ activeGroupCode, updateActiveGroup, removeGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  const context = useContext(GroupContext);
  if (!context)
    throw new Error("useGroupContext must be used within a GroupProvider");
  return context;
};
