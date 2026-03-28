// TODO: Don't send messages from backend, instead send status codes and handle messages in frontend

export const MEMBER_MESSAGES = {
  CREATED: "Member created successfully",
  DELETED: "Member deleted successfully",
  UPDATED: "Member name updated successfully",
  NOT_FOUND: "Member not found",
  NAME_TAKEN: "Name is already taken in this group",
  HAS_TRANSACTIONS: "Member has associated transactions and cannot be deleted",
};

export const TRANSACTION_MESSAGES = {
  FETCHED: "Transactions retrieved successfully",
};

export const SYSTEM_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal server error",
  GROUP_NOT_FOUND: "Group not found",
};
