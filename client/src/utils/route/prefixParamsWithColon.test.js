import prefixParamsWithColon from "./prefixParamsWithColon";
import { ROUTE_PARAMS } from "../../../shared/constants/routeParams";
import {
  MOCK_DATA,
  MOCK_STRINGS,
} from "../../../shared/constants/testConstants";

describe("prefixParamsWithColon", () => {
  const stringWithoutSlash = MOCK_STRINGS.WITHOUT_SLASHES[0].SLASHED;

  const mockParams = {
    STRING: MOCK_DATA.STRING,
    ID: MOCK_DATA.ID,
    NO_SLASH: stringWithoutSlash,
  };

  it("should prefix all object values with a colon", () => {
    const result = prefixParamsWithColon(mockParams);

    expect(result.STRING).toBe(`:${MOCK_DATA.STRING}`);
    expect(result.ID).toBe(`:${MOCK_DATA.ID}`);
    expect(result.NO_SLASH).toBe(`:${stringWithoutSlash}`);
  });

  it("should return an object with the same keys as the input", () => {
    const result = prefixParamsWithColon(mockParams);
    const inputKeys = Object.keys(mockParams);
    const outputKeys = Object.keys(result);

    expect(outputKeys).toEqual(inputKeys);
  });

  it("should work correctly with the actual shared ROUTE_PARAMS", () => {
    const result = prefixParamsWithColon(ROUTE_PARAMS);

    const hasAllColons = Object.values(result).every((value) =>
      value.startsWith(":"),
    );
    expect(hasAllColons).toBe(true);

    expect(result.GROUP_CODE).toBe(`:${ROUTE_PARAMS.GROUP_CODE}`);
  });

  it("should return an empty object when provided an empty object", () => {
    const result = prefixParamsWithColon({});

    expect(result).toEqual({});
  });

  it("should not mutate the original params object", () => {
    const originalParams = { ...mockParams };
    prefixParamsWithColon(originalParams);

    expect(originalParams).toEqual(mockParams);
  });
});
