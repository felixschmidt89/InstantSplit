import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { devLog } from "../utils/errorUtils";
import { fetchGroupData } from "../api/groups/fetchGroupData";

const useFetchGroupData = (groupCode) => {
  const { t } = useTranslation();
  const [groupData, setGroupData] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchGroupData(groupCode);

        if (!data) {
          devLog("No group found for groupCode:", groupCode);
          setIsFetched(true);
          return;
        }

        setGroupData(data);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching group data:", error);
        setError(t("generic-error-message"));
      }
    };

    if (groupCode) {
      getData();
    }
  }, [groupCode, t]);

  return { groupData, isFetched, error };
};

export default useFetchGroupData;
