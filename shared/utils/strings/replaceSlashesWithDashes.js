export const replaceSlashesWithDashes = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(/\//g, "-");
};
