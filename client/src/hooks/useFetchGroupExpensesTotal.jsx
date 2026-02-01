import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { devLog } from "../utils/errorUtils";
import { API_URL } from "../constants/apiConstants";

const useFetchGroupExpensesTotal = (groupCode) => {
  const { t } = useTranslation();
  const [expensesTotal, setExpensesTotal] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupExpensesTotal = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/expenses/totalExpenses/${groupCode}`,
        );
        setExpensesTotal(response.data.expensesTotal);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching group expenses total:", error);
        setError(t("generic-error-message"));
      }
    };

    fetchGroupExpensesTotal();
  }, [groupCode, t]);

  return { expensesTotal, isFetched, error };
};

export default useFetchGroupExpensesTotal;
