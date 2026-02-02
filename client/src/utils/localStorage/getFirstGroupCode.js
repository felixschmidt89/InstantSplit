import { devLog } from "@client-utils/errorUtils";
import { getStoredGroupCodes } from "./getStoredGroupCodes";

export const getFirstGroupCode = () => {
  try {
    const storedGroupCodes = getStoredGroupCodes();

    return storedGroupCodes?.length ? storedGroupCodes[0] : null;
  } catch (error) {
    devLog(
      `Error retrieving the first groupCode from the storedGroupCodes array:`,
      error,
    );

    return null;
  }
};
