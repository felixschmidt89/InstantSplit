import { LOG_LEVELS, LOG_SOURCES } from "../../constants/debugConstants.js";
import {
  MOCK_LOGS,
  MOCK_LOG_METHODS,
  MOCK_DATA,
} from "../../constants/testConstants.js";
import { debugLog } from "./debugLog.js";

describe("debugLog", () => {
  const originalEnv = process.env.NODE_ENV;
  const logSpy = jest
    .spyOn(console, MOCK_LOG_METHODS.LOG)
    .mockImplementation(() => {});
  const errorSpy = jest
    .spyOn(console, MOCK_LOG_METHODS.ERROR)
    .mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = "development";
  });

  afterAll(() => {
    process.env.NODE_ENV = originalEnv;
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it("should log a basic message with default INFO level", () => {
    debugLog(MOCK_LOGS.TEST_MESSAGE);

    const expectedOutput = `${LOG_LEVELS.INFO.toUpperCase()}: ${MOCK_LOGS.TEST_MESSAGE}`;
    expect(logSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it("should include the source tag when LOG_SOURCES.SERVER is provided", () => {
    debugLog(
      MOCK_LOGS.TEST_MESSAGE,
      undefined,
      LOG_LEVELS.INFO,
      LOG_SOURCES.SERVER,
    );

    const expectedOutput = `[${LOG_SOURCES.SERVER.toUpperCase()}] ${LOG_LEVELS.INFO.toUpperCase()}: ${MOCK_LOGS.TEST_MESSAGE}`;
    expect(logSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it("should use console.error when level is LOG_LEVELS.ERROR", () => {
    debugLog(
      MOCK_LOGS.ERROR_MESSAGE,
      undefined,
      LOG_LEVELS.ERROR,
      LOG_SOURCES.SERVER,
    );

    const expectedOutput = `[${LOG_SOURCES.SERVER.toUpperCase()}] ${LOG_LEVELS.ERROR.toUpperCase()}: ${MOCK_LOGS.ERROR_MESSAGE}`;
    expect(errorSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it("should use console.error when data is an instance of Error", () => {
    debugLog(MOCK_LOGS.TEST_MESSAGE, MOCK_LOGS.MOCK_ERROR, LOG_LEVELS.INFO);

    const expectedOutput = `${LOG_LEVELS.INFO.toUpperCase()}: ${MOCK_LOGS.TEST_MESSAGE}`;
    expect(errorSpy).toHaveBeenCalledWith(expectedOutput, MOCK_LOGS.MOCK_ERROR);
  });

  it("should not log when NODE_ENV is production", () => {
    process.env.NODE_ENV = "production";
    debugLog(MOCK_DATA.STRING);

    expect(logSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });
