import { MOCK_DATA, MOCK_STRINGS } from "../../constants/testConstants";
import { replaceSlashesWithDashes } from "./replaceSlashesWithDashes";

describe("replaceSlashesWithDashes", () => {
  it("should transform strings with slashes into dashes", () => {
    const { SLASHED, DASHED } = MOCK_STRINGS.WITH_SLASHES[0];
    expect(replaceSlashesWithDashes(SLASHED)).toBe(DASHED);
  });

  it("should return the same value for strings without slashes", () => {
    const { SLASHED, DASHED } = MOCK_STRINGS.WITHOUT_SLASHES[0];
    expect(replaceSlashesWithDashes(SLASHED)).toBe(DASHED);
  });

  it("should return an empty string for non-string types", () => {
    expect(replaceSlashesWithDashes(MOCK_DATA.NUMBER)).toBe("");
    expect(replaceSlashesWithDashes(null)).toBe("");
  });
});
