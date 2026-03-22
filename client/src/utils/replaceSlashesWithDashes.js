// TODO: Move to shared
export const replaceSlashesWithDashes = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(/\//g, "-");
};

export default replaceSlashesWithDashes;
