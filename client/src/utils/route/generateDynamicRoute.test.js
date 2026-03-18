import {
  MOCK_DATA,
  MOCK_LOCALSTORAGE_VALUES,
} from "../../../../shared/constants/test/testConstants.js";
import generateDynamicRoute from "./generateDynamicRoute";

describe("generateDynamicRoute", () => {
  const mockBasePath = "/test-route";
  const mockParam = MOCK_LOCALSTORAGE_VALUES.ACTIVE_GROUP_CODE;
  const mockId = MOCK_DATA.ID;

  it("should correctly concatenate a base path and a single parameter", () => {
    const result = generateDynamicRoute(mockBasePath, [mockParam]);

    expect(result).toBe(`${mockBasePath}/${mockParam}`);
  });

  it("should correctly concatenate a base path and multiple parameters using a slash separator", () => {
    const params = [mockParam, mockId];
    const result = generateDynamicRoute(mockBasePath, params);

    expect(result).toBe(`${mockBasePath}/${mockParam}/${mockId}`);
  });

  it("should return the base path with a trailing slash if params array is empty", () => {
    const result = generateDynamicRoute(mockBasePath, []);

    expect(result).toBe(`${mockBasePath}/`);
  });

  it("should handle base paths that are just a root slash", () => {
    const rootPath = "/";
    const result = generateDynamicRoute(rootPath, [mockParam]);

    expect(result).toBe(`//${mockParam}`);
  });
});
