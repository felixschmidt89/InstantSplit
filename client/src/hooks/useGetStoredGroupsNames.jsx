import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getStoredGroupCodes } from "../utils/localStorage";
import { debugLog } from "../../../shared/utils/debug";
import { fetchStoredGroupNames } from "../api/groups/fetchStoredGroupNames";

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
        const groupCodesArray = getStoredGroupCodes();

        if (!groupCodesArray?.length) {
          setStoredGroups([]);
          return;
        }

        const data = await fetchStoredGroupNames(groupCodesArray);

        const allGroups = data?.groupNamesAndGroupCodes || [];

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
