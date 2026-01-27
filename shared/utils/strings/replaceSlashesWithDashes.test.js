import { replaceSlashesWithDashes } from "./replaceSlashesWithDashes";
import {
  MOCK_DATA,
  MOCK_TRANSFORMATIONS,
} from "@client-constants/mockDataConstants";

describe("replaceSlashesWithDashes", () => {
  it("should transform a standard route literal correctly", () => {
    const { INPUT, EXPECTED } = MOCK_TRANSFORMATIONS.ROUTE_TO_DASHED;
    expect(replaceSlashesWithDashes(INPUT)).toBe(EXPECTED);
  });

  it("should transform a nested route literal correctly", () => {
    const { INPUT, EXPECTED } = MOCK_TRANSFORMATIONS.NESTED_ROUTE_TO_DASHED;
    expect(replaceSlashesWithDashes(INPUT)).toBe(EXPECTED);
  });

  it("should return an empty string for non-string types from MOCK_DATA", () => {
    expect(replaceSlashesWithDashes(MOCK_DATA.NUMBER)).toBe("");
    expect(replaceSlashesWithDashes(MOCK_DATA.OBJECT)).toBe("");
    expect(replaceSlashesWithDashes(MOCK_DATA.ARRAY)).toBe("");
  });

  it("should handle a simple string without slashes", () => {
    const input = "no_slashes_here";
    expect(replaceSlashesWithDashes(input)).toBe(input);
  });
});
