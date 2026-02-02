import { MOCK_LOGS, MOCK_LOG_METHODS } from "@shared-constants/testConstants";
import { debugLog } from "./debugLog";

describe("debugLog", () => {
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    logSpy = jest
      .spyOn(console, MOCK_LOG_METHODS.LOG)
      .mockImplementation(() => {});
    errorSpy = jest
      .spyOn(console, MOCK_LOG_METHODS.ERROR)
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should log default 'debug' message when no arguments are provided", () => {
    debugLog();
    expect(logSpy).toHaveBeenCalledWith(MOCK_LOGS.DEFAULT_MESSAGE);
  });

  test("should log provided info message constant", () => {
    debugLog(MOCK_LOGS.INFO_MESSAGE);
    expect(logSpy).toHaveBeenCalledWith(MOCK_LOGS.INFO_MESSAGE);
  });

  test("should log message and associated data object", () => {
    debugLog(MOCK_LOGS.INFO_MESSAGE, MOCK_LOGS.GENERIC_OBJECT);
    expect(logSpy).toHaveBeenCalledWith(
      MOCK_LOGS.INFO_MESSAGE,
      MOCK_LOGS.GENERIC_OBJECT,
    );
  });

  test("should route to console.error when data is an Error instance", () => {
    debugLog(MOCK_LOGS.ERROR_CONTEXT, MOCK_LOGS.TEST_ERROR);
    expect(errorSpy).toHaveBeenCalledWith(
      MOCK_LOGS.ERROR_CONTEXT,
      MOCK_LOGS.TEST_ERROR,
    );
  });
});
