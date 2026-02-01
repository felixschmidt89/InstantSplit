import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { API_ROUTES } from "../../../shared/constants/apiRoutesConstants";
import { getStoredGroupCodes } from "../utils/localStorage";
import { API_URL } from "../constants/apiConstants";
import { debugLog } from "../../../shared/utils/debug";

const useGetStoredGroupsNames = (activeGroupCode) => {
  const { t } = useTranslation();

  const [storedGroups, setStoredGroups] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  const { GROUPS } = API_ROUTES;

  useEffect(() => {
    const fetchGroupNames = async () => {
      setIsFetched(false);
      setError(null);

      try {
        const groupCodesArray = getStoredGroupCodes();

        if (!groupCodesArray?.length) {
          setStoredGroups([]);
          return;
        }

        const groupCodesString = groupCodesArray.join(",");
        const endpoint = `${API_URL}/${GROUPS.GROUPS_BASE}/${GROUPS.STORED_GROUP_NAMES}`;

        const { data } = await axios.get(endpoint, {
          params: { storedGroupCodes: groupCodesString },
        });

        const allGroups = data?.groupNamesAndGroupCodes || [];

        const otherGroups = allGroups.filter(
          (group) => group.groupCode !== activeGroupCode,
        );

        setStoredGroups(otherGroups);
      } catch (err) {
        debugLog("Error fetching stored group names:", err);
        setError(t("generic-error-message"));
      } finally {
        setIsFetched(true);
      }
    };

    fetchGroupNames();
  }, [activeGroupCode, t, GROUPS.GROUPS_BASE, GROUPS.STORED_GROUP_NAMES]);

  return { storedGroups, isFetched, error };
};

export default useGetStoredGroupsNames;
