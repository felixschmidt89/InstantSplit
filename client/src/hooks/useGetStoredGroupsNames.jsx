import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import getStoredGroupCodesFromLocalStorage from "../utils/localStorage/getStoredGroupCodesFromLocalStorage.js";
import debugLog from "../../../shared/utils/debug/debugLog.js";
import fetchStoredGroupNames from "../api/groups/fetchStoredGroupNames";

// TODO: Refactor and hide group codes so that they are not exposed in the API endpoint

const useGetStoredGroupsNames = (activeGroupCode) => {
  const { t } = useTranslation();

  const [storedGroups, setStoredGroups] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNames = async () => {
      setIsFetched(false);
      setError(null);

      try {
        const groupCodesArray = getStoredGroupCodesFromLocalStorage();

        if (!groupCodesArray?.length) {
          setStoredGroups([]);
          return;
        }

        const { groupNamesAndGroupCodes } =
          await fetchStoredGroupNames(groupCodesArray);

        const allGroups = groupNamesAndGroupCodes || [];

        const notActiveGroups = allGroups.filter(
          (group) => group.groupCode !== activeGroupCode,
        );

        setStoredGroups(notActiveGroups);
      } catch (err) {
        debugLog("Error fetching stored group names:", err);
        setError(t("generic-error-message"));
      } finally {
        setIsFetched(true);
      }
    };

    getNames();
  }, [activeGroupCode, t]);

  return { storedGroups, isFetched, error };
};

export default useGetStoredGroupsNames;
